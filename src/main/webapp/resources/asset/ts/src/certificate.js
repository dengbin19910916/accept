"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/jquery/jquery.d.ts" />
var moment = require("moment");
/**
 * 证件类型。
 * @author deng.bin.outs
 */
var preaccept;
(function (preaccept) {
    var model;
    (function (model) {
        var GenderException;
        (function (GenderException) {
            var GenderParseError = (function (_super) {
                __extends(GenderParseError, _super);
                function GenderParseError(message) {
                    _super.call(this, message);
                    this.name = "Gender Exception";
                    this.message = message;
                    this.stack = new Error().stack;
                }
                GenderParseError.prototype.toString = function () {
                    return this.name + ": " + this.message;
                };
                return GenderParseError;
            }(Error));
            GenderException.GenderParseError = GenderParseError;
        })(GenderException || (GenderException = {}));
        /**
         * 性别类型。
         */
        var GenderType;
        (function (GenderType) {
            /**
             * 女。
             */
            GenderType[GenderType["Female"] = 0] = "Female";
            /**
             * 男。
             */
            GenderType[GenderType["Male"] = 1] = "Male";
        })(GenderType || (GenderType = {}));
        /**
         * 性别。
         */
        var Gender = (function () {
            /**
             * 性别对象的构造函数。
             * @param {GenderType} genderType 性别类型。
             */
            function Gender(genderType) {
                this.genderType = genderType;
                this._name = this.getName();
                this._code = this.getValue();
            }
            Object.defineProperty(Gender.prototype, "code", {
                get: function () {
                    return this._code;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Gender.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 返回性别名称。
             * @returns {string} 性别名称。
             */
            Gender.prototype.getName = function () {
                switch (this.genderType) {
                    case GenderType.Female:
                        return "女";
                    case GenderType.Male:
                        return "男";
                }
            };
            /**
             * 返回性别值。
             * @returns {string} 性别值。
             */
            Gender.prototype.getValue = function () {
                switch (this.genderType) {
                    case GenderType.Female:
                        return "F";
                    case GenderType.Male:
                        return "M";
                }
            };
            /**
             * 通过性别值创建性别对象。
             * @param {string} value 性别值。
             * @returns {Gender} 性别对象。
             */
            Gender.valueOf = function (value) {
                switch (value) {
                    case "F":
                    case "f":
                        return new Gender(GenderType.Female);
                    case "M":
                    case "m":
                        return new Gender(GenderType.Male);
                    default:
                        throw new GenderException.GenderParseError("无效的性别值！性别名称只能为M或F。");
                }
            };
            /**
             * 通过性别名称创建性别对象。
             * @param {string} name 性别名称。
             * @returns {Gender} 性别对象。
             */
            Gender.nameOf = function (name) {
                switch (name) {
                    case "男":
                        return new Gender(GenderType.Female);
                    case "女":
                        return new Gender(GenderType.Male);
                    default:
                        throw new GenderException.GenderParseError("无效的性别名称！性别名称只能为男或女。");
                }
            };
            /**
             * 返回性别名称。
             * @returns {string} 性别名称。
             */
            Gender.prototype.toString = function () {
                return this._name;
            };
            return Gender;
        }());
        model.Gender = Gender;
        /**
         * 证件对象的抽象父类型。
         */
        var Card = (function () {
            /**
             * 通过证件号码初始化证件对象。
             * @param {String} number 证件号码。
             * @param {String} url 验证证件号码的url。
             * @param {Date|String} dueDate 证件到期日期，默认日期格式为：yyyy-MM-dd。
             * @param {Date|String} startDate 证件生效日期，默认日期格式为：yyyy-MM-dd。
             */
            function Card(number, url, dueDate, startDate) {
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
            Card.prototype.getNumber = function () {
                return this.number;
            };
            /**
             * 返回验证证件号码的url。
             * @returns {String} 验证证件号码的url。
             */
            Card.prototype.getUrl = function () {
                return this.url;
            };
            /**
             * 设置验证证件号码的url。
             * @param {string} url 验证证件号码的url。
             */
            Card.prototype.setUrl = function (url) {
                this.url = url;
                this.isValid();
            };
            /**
             * 返回证件的生效日期。
             * @returns {Date} 证件的生效日期。
             */
            Card.prototype.getStartDate = function () {
                return this.startDate;
            };
            /**
             * 设置证件的生效日期。
             * @param {Date|String} startDate 证件的生效日期。
             * @param {String} format 日期格式。
             */
            Card.prototype.setStartDate = function (startDate, format) {
                if (startDate instanceof Date) {
                    this.startDate = startDate;
                }
                if (startDate instanceof String || typeof startDate === "string") {
                    this.startDate = format != null ? moment(startDate, format).toDate() : moment(startDate).toDate();
                }
            };
            /**
             * 返回证件的失效日期。
             * @returns {Date} 证件的失效日期。
             */
            Card.prototype.getDueDate = function () {
                return this.dueDate;
            };
            /**
             * 设置证件的失效日期。
             * @param {Date|String} dueDate 证件的失效日期。
             * @param {String} format 日期格式。
             */
            Card.prototype.setDueDate = function (dueDate, format) {
                if (dueDate instanceof Date) {
                    this.dueDate = dueDate;
                }
                if (dueDate instanceof String || typeof dueDate === "string") {
                    this.dueDate = format != null ? moment(dueDate, format).toDate() : moment(dueDate).toDate();
                }
            };
            /**
             * 返回证件是否有效，即证件号码正确，并且没有失效。
             * @returns {Boolean} 证件是否有效，true - 有效，false - 无效。
             */
            Card.prototype.isEffective = function () {
                if (!this.isValid()) {
                    return false;
                }
                if (this.dueDate == null) {
                    return true;
                }
                return this.dueDate.getTime() <= new Date().getTime();
            };
            /**
             * 返回证件号码的验证结果。
             * @returns {Boolean} 证件号码是否正确，true - 正确，false - 错误。
             */
            Card.prototype.isValid = function () {
                if (this.valid) {
                    return true;
                }
                var result = false;
                $.ajax({
                    url: this.getUrl(),
                    type: "POST",
                    async: false,
                    data: { number: this.number },
                    timeout: 5000,
                    dataType: "json",
                    success: function (data) {
                        result = data.valid == "true";
                    }
                });
                return result;
            };
            /**
             * 比较两个证件的证件号码判断证件对象是否相同。
             * @param {accept.certificate.Card} other 证件对象
             * @returns {Boolean} 证件号码是否正确，true - 相同，false - 不相同。
             */
            Card.prototype.equals = function (other) {
                return this.number === other.number;
            };
            /**
             * 返回证件号码。
             * @returns {String} 证件号码。
             */
            Card.prototype.toString = function () {
                return this.number;
            };
            return Card;
        }());
        model.Card = Card;
        /**
         * 身份证对象。
         */
        var IdCard = (function (_super) {
            __extends(IdCard, _super);
            /**
             * 身份证对象构造函数。
             * @param {String} number 证件号码
             * @param {String} url 验证证件号码的url。
             */
            function IdCard(number, url) {
                if (url === void 0) { url = "/valid/identity"; }
                _super.call(this, number, url);
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
            IdCard.prototype.getBirthday = function () {
                if (!this.isValid()) {
                    return null;
                }
                var year = parseInt(this.number.substring(6, 10));
                var month = parseInt(this.number.substring(10, 12));
                var date = parseInt(this.number.substring(12, 14));
                return new Date(year, month, date);
            };
            /**
             * 返回身份证对象中的性别信息。
             * @returns {GenderType} 性别，0 - 女，1 - 男。
             */
            IdCard.prototype.getGender = function () {
                if (!this.isValid()) {
                    return null;
                }
                var orderNum = parseInt(this.number.substring(14, 17));
                return orderNum % 2 == 0 ? new Gender(GenderType.Female) : new Gender(GenderType.Male);
            };
            /**
             * 返回身份证对象中的年龄信息。
             * @returns {number} 身份证对象中的年龄信息。
             */
            IdCard.prototype.getAge = function () {
                if (!this.isValid()) {
                    return null;
                }
                var returnAge;
                var birthYear = this.getBirthday().getFullYear();
                var birthMonth = this.getBirthday().getMonth() + 1;
                var birthDay = this.getBirthday().getDate();
                var now = new Date();
                var nowYear = now.getFullYear();
                var nowMonth = now.getMonth() + 1;
                var nowDay = now.getDate();
                if (nowYear == birthYear) {
                    returnAge = 0; // 同年 则为0岁
                }
                else {
                    var ageDiff = nowYear - birthYear; // 年之差
                    if (ageDiff > 0) {
                        if (nowMonth == birthMonth) {
                            var dayDiff = nowDay - birthDay; // 日之差
                            if (dayDiff < 0) {
                                returnAge = ageDiff - 1;
                            }
                            else {
                                returnAge = ageDiff;
                            }
                        }
                        else {
                            var monthDiff = nowMonth - birthMonth; // 月之差
                            if (monthDiff < 0) {
                                returnAge = ageDiff - 1;
                            }
                            else {
                                returnAge = ageDiff;
                            }
                        }
                    }
                    else {
                        returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                return returnAge; // 返回周岁年龄
            };
            /**
             * 返回证件是否是永久性的。
             * @returns {Boolean} 证件是否是永久性的。true - 永久的，false - 非永久的。
             */
            IdCard.prototype.isPermanent = function () {
                return this.getAge() >= 46;
            };
            /**
             * 将15位身份证转换为18位身份证。
             */
            IdCard.prototype.convert = function () {
                if (this.number.length == 18) {
                    return;
                }
                var areaCode = this.number.substring(0, 6);
                var birthday = "19" + this.number.substring(6, 12);
                var orderCode = this.number.substring(12, 15);
                var newNumber = areaCode + birthday + orderCode;
                var sum = 0;
                // 系数 7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2
                var coefficients = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                for (var i = 0; i < newNumber.length; i++) {
                    var val = newNumber.charAt(i);
                    sum += parseInt(val) * coefficients[i];
                }
                var remainder = sum % 11;
                // 参照码 1－0－X－9－8－7－6－5－4－3－2
                var referenceCodes = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
                newNumber += referenceCodes[remainder];
                this.number = newNumber;
            };
            return IdCard;
        }(Card));
        model.IdCard = IdCard;
    })(model = preaccept.model || (preaccept.model = {}));
})(preaccept || (preaccept = {}));
