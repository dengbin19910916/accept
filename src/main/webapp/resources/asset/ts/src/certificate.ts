/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../node_modules/moment/moment.d.ts" />
import moment = require("moment");
/**
 * 证件类型。
 * @author deng.bin.outs
 */
namespace accept.certificate {
    module GenderException {
        export declare class Error {
            public name: string;
            public message: string;
            public stack: string;

            constructor(message?: string);
        }

        export class Exception extends Error {
            constructor(public message: string) {
                super(message);
                this.name = "Exception";
                this.message = message;
                this.stack = (<any>new Error()).stack;
            }

            toString() {
                return `${this.name}: ${this.message}`;
            }
        }
    }

    /**
     * 性别类型。
     */
    enum GenderType {
        /**
         * 女。
         */
        Female,
        /**
         * 男。
         */
        Male
    }

    /**
     * 性别。
     */
    export class Gender {
        /**
         * 性别类型。
         */
        private genderType: GenderType;
        /**
         * 姓名名称。
         */
        private name: string;
        /**
         * 性别值。
         */
        private value: string;

        /**
         * 性别对象的构造函数。
         * @param {GenderType} genderType 性别类型。
         */
        public constructor(genderType: GenderType) {
            this.genderType = genderType;
            this.name = this.getName();
            this.value = this.getValue();
        }

        /**
         * 返回性别名称。
         * @returns {string} 性别名称。
         */
        public getName(): string {
            switch (this.genderType) {
                case GenderType.Female:
                    return "女";
                case GenderType.Male:
                    return "男";
            }
        }

        /**
         * 返回性别值。
         * @returns {string} 性别值。
         */
        public getValue(): string {
            switch (this.genderType) {
                case GenderType.Female:
                    return "F";
                case GenderType.Male:
                    return "M";
            }
        }

        /**
         * 通过性别值创建性别对象。
         * @param {string} value 性别值。
         * @returns {Gender} 性别对象。
         */
        public static valueOf(value: string): Gender {
            switch (value) {
                case "F":
                case "f":
                    return new Gender(GenderType.Female);
                case "M":
                case "m":
                    return new Gender(GenderType.Male);
                default:
                    throw new GenderError("无效的性别值！性别名称只能为M或F。");
            }
        }

        /**
         * 通过性别名称创建性别对象。
         * @param {string} name 性别名称。
         * @returns {Gender} 性别对象。
         */
        public static nameOf(name: string): Gender {
            switch (name) {
                case "男":
                    return new Gender(GenderType.Female);
                case "女":
                    return new Gender(GenderType.Male);
                default:
                    throw new GenderError("无效的性别名称！性别名称只能为男或女。");
            }
        }

        /**
         * 返回性别名称。
         * @returns {string} 性别名称。
         */
        public toString(): string {
            return this.name;
        }
    }

    class GenderError extends GenderException.Exception {

    }

    /**
     * 证件对象的抽象父类型。
     */
    export abstract class Card {

        /**
         * 证件号码。
         */
        protected number: string;
        /**
         * 证件号码的验证状态，当证件号码为真时，设置字段值为true。
         */
        protected valid: boolean;
        /**
         * 验证证件号码的url。
         */
        protected url: string;
        /**
         * 证件的生效日期。
         */
        protected startDate: Date;
        /**
         * 证件的失效日期。
         */
        protected dueDate: Date;

        /**
         * 通过证件号码初始化证件对象。
         * @param {String} number 证件号码。
         * @param {String} url 验证证件号码的url。
         * @param {Date|String} dueDate 证件到期日期，默认日期格式为：yyyy-MM-dd。
         * @param {Date|String} startDate 证件生效日期，默认日期格式为：yyyy-MM-dd。
         */
        public constructor(number: string, url: string, dueDate?: Date | string, startDate?: Date | string) {
            this.number = number;
            this.url = url;
            this.setDueDate(dueDate);
            this.setStartDate(startDate);
            this.valid = this.isValid();
        }

        /**
         * 返回证件号码。
         * @returns {String} 证件号码。
         */
        public getNumber(): string {
            return this.number;
        }

        /**
         * 返回验证证件号码的url。
         * @returns {String} 验证证件号码的url。
         */
        public getUrl(): string {
            return this.url;
        }

        /**
         * 设置验证证件号码的url。
         * @param {string} url 验证证件号码的url。
         */
        public setUrl(url: string): void {
            this.url = url;
            this.isValid();
        }

        /**
         * 返回证件的生效日期。
         * @returns {Date} 证件的生效日期。
         */
        public getStartDate(): Date {
            return this.startDate;
        }

        /**
         * 设置证件的生效日期。
         * @param {Date|String} startDate 证件的生效日期。
         * @param {String} format 日期格式。
         */
        public setStartDate(startDate: Date | string, format?: string) {
            if (startDate instanceof Date) {
                this.startDate = startDate;
            }
            if (startDate instanceof String || typeof startDate === "string") {
                this.startDate = format != null ? moment(startDate, format).toDate() : moment(startDate).toDate();
            }
        }

        /**
         * 返回证件的失效日期。
         * @returns {Date} 证件的失效日期。
         */
        public getDueDate(): Date {
            return this.dueDate;
        }

        /**
         * 设置证件的失效日期。
         * @param {Date|String} dueDate 证件的失效日期。
         * @param {String} format 日期格式。
         */
        public setDueDate(dueDate: Date | string, format?: string) {
            if (dueDate instanceof Date) {
                this.dueDate = dueDate;
            }
            if (dueDate instanceof String || typeof dueDate === "string") {
                this.dueDate = format != null ? moment(dueDate, format).toDate() : moment(dueDate).toDate();
            }
        }

        /**
         * 返回证件是否有效，即证件号码正确，并且没有失效。
         * @returns {Boolean} 证件是否有效，true - 有效，false - 无效。
         */
        public isEffective(): boolean {
            if (!this.isValid()) {
                return false;
            }
            if (this.dueDate == null) { // 证件无失效日期时，认为证件永久有效
                return true;
            }

            return this.dueDate.getTime() <= new Date().getTime();
        }

        /**
         * 返回证件号码的验证结果。
         * @returns {Boolean} 证件号码是否正确，true - 正确，false - 错误。
         */
        public isValid(): boolean {
            if (this.valid) {
                return true;
            }
            let result: boolean = false;
            $.ajax({
                url: this.getUrl(),
                type: "POST",
                async: false,
                data: {number: this.number},
                timeout: 5000,
                dataType: "json",
                success: (data) => {
                    result = data.valid;
                }
            });
            return result;
        }

        /**
         * 比较两个证件的证件号码判断证件对象是否相同。
         * @param {accept.certificate.Card} other 证件对象
         * @returns {Boolean} 证件号码是否正确，true - 相同，false - 不相同。
         */
        public equals(other: Card): boolean {
            return this.number === other.number;
        }

        /**
         * 返回证件号码。
         * @returns {String} 证件号码。
         */
        public toString(): string {
            return this.number;
        }
    }

    /**
     * 身份证对象。
     */
    export class IdCard extends Card {

        /**
         * 出生日期。
         */
        private birthday: Date;
        /**
         * 性别。
         */
        private gender: Gender;
        /**
         * 年龄。
         */
        private age: number;

        /**
         * 身份证对象构造函数。
         * @param {String} number 证件号码
         * @param {String} url 验证证件号码的url。
         */
        public constructor(number: string, url: string = "/valid/identity") {
            super(number, url);
            if (number.length == 15) {
                this.convert();
            }
            this.birthday = this.getBirthday();
            this.gender = this.getGender();
            this.age = this.getAge();
        }

        /**
         * 返回身份证对象中的出生日期信息。
         * @returns {Date} 出生日期。
         */
        public getBirthday(): Date {
            if (!this.isValid()) {
                return null;
            }

            let year = parseInt(this.number.substring(6, 10));
            let month = parseInt(this.number.substring(10, 12));
            let date = parseInt(this.number.substring(12, 14));
            return new Date(year, month, date);
        }

        /**
         * 返回身份证对象中的性别信息。
         * @returns {GenderType} 性别，0 - 女，1 - 男。
         */
        public getGender(): Gender {
            if (!this.isValid()) {
                return null;
            }

            let orderNum = parseInt(this.number.substring(14, 17));
            return orderNum % 2 == 0 ? new Gender(GenderType.Female) : new Gender(GenderType.Male);
        }

        /**
         * 返回身份证对象中的年龄信息。
         * @returns {number} 身份证对象中的年龄信息。
         */
        public getAge(): number {
            if (!this.isValid()) {
                return null;
            }
            let returnAge;
            let birthYear = this.getBirthday().getFullYear();
            let birthMonth = this.getBirthday().getMonth() + 1;
            let birthDay = this.getBirthday().getDate();

            let now = new Date();
            let nowYear = now.getFullYear();
            let nowMonth = now.getMonth() + 1;
            let nowDay = now.getDate();

            if (nowYear == birthYear) {
                returnAge = 0;  // 同年 则为0岁
            } else {
                let ageDiff = nowYear - birthYear;  // 年之差
                if (ageDiff > 0) {
                    if (nowMonth == birthMonth) {
                        let dayDiff = nowDay - birthDay;    // 日之差
                        if (dayDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    } else {
                        let monthDiff = nowMonth - birthMonth;  // 月之差
                        if (monthDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    }
                } else {
                    returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
                }
            }

            return returnAge;   // 返回周岁年龄
        }

        /**
         * 返回证件是否是永久性的。
         * @returns {Boolean} 证件是否是永久性的。true - 永久的，false - 非永久的。
         */
        public isPermanent(): boolean {
            return this.getAge() >= 46;
        }

        /**
         * 将15位身份证转换为18位身份证。
         */
        private convert(): void {
            if (this.number.length == 18) {
                return;
            }

            let areaCode = this.number.substring(0, 6);
            let birthday = "19" + this.number.substring(6, 12);
            let orderCode = this.number.substring(12, 15);
            let newNumber = areaCode + birthday + orderCode;

            let sum = 0;
            // 系数 7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2
            let coefficients: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            for (let i = 0; i < newNumber.length; i++) {
                let val = newNumber.charAt(i);
                sum += parseInt(val) * coefficients[i];
            }

            let remainder = sum % 11;
            // 参照码 1－0－X－9－8－7－6－5－4－3－2
            let referenceCodes: string[] = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
            newNumber += referenceCodes[remainder];

            this.number = newNumber;
        }
    }
}