/**
 * Created by dengb on 2017/1/16.
 */
/// <reference path="../typings/jquery/jquery.d.ts" />

/**
 * 项目根命名空间。
 */
export namespace accept {


    export namespace model {

        /**
         * 申请人类型。
         */
        export enum PersonType {
            /**
             * 借款人。
             */
            Borrower,
                /**
                 * 共同借款人。
                 */
            CoBorrower,
                /**
                 * 担保人。
                 */
            Guarantee
        }

        /**
         * 地区类型。
         */
        export enum RegionType {
            /**
             * 公司地址。
             */
            Office,
                /**
                 * 家庭地址。
                 */
            Home
        }

        /**
         * 地区对象。
         */
        export class Region {
            private _code: string;
            private _name: string;
            private _regionType: RegionType;
            private _url: string;

            constructor(regionType: RegionType, code: string, url?: string) {
                this._regionType = regionType;
                this._code = code;
                if (url != void 0) {
                    this._url = url;
                }
                this.init();
            }

            get regionType(): RegionType {
                return this._regionType;
            }

            get code(): string {
                return this._code;
            }

            get name(): string {
                return this._name;
            }

            set url(value: string) {
                this._url = value;
            }

            toString() {
                return `${this._name} [${this._code}]`;
            }

            private init() {
                $.ajax({
                    url: this._url,
                    type: "POST",
                    async: false,
                    data: {code: this._code},
                    timeout: 5000,
                    dataType: "json",
                    success: (data) => {
                        this._name = data._name;
                    }
                });
            }
        }


        /**
         * 地址。
         */
        export class Address {
            private _state: Region;
            private _city: Region;
            private _postCode: string;
            private _addressName: string;

            constructor(state: Region, city?: Region, postCode?: string, addressName?: string) {
                this._state = state;
                this._city = city;
                this._postCode = postCode;
                this._addressName = addressName;
            }

            get state(): accept.model.Region {
                return this._state;
            }

            set state(value: accept.model.Region) {
                this._state = value;
            }

            get city(): accept.model.Region {
                return this._city;
            }

            set city(value: accept.model.Region) {
                this._city = value;
            }

            get postCode(): string {
                return this._postCode;
            }

            set postCode(value: string) {
                this._postCode = value;
            }

            get addressName(): string {
                return this._addressName;
            }

            set addressName(value: string) {
                this._addressName = value;
            }
        }

        export class Person {
            private personType: PersonType;

            private prefix: string;

            private _customerName: string;
            private _cardType: string;
            private _cardNumber: string;
            private _expirationDate: Date;
            private _mobileNumber: string;

            constructor(personType: PersonType) {
                this.personType = personType;
                switch (personType) {
                    case PersonType.Borrower:
                        this.prefix = "borrower";
                        break;
                    case PersonType.CoBorrower:
                        this.prefix = "coBorrower";
                        break;
                    case PersonType.Guarantee:
                        this.prefix = "guarantee";
                        break;
                    default:
                        this.prefix = "";
                }
            }

            get customerName(): string {
                return this._customerName;
            }

            set customerName(value: string) {
                this._customerName = value;
            }

            get cardType(): string {
                return this._cardType;
            }

            set cardType(value: string) {
                this._cardType = value;
            }

            get cardNumber(): string {
                return this._cardNumber;
            }

            set cardNumber(value: string) {
                this._cardNumber = value;
            }

            get expirationDate(): Date {
                return this._expirationDate;
            }

            set expirationDate(value: Date) {
                this._expirationDate = value;
            }

            get mobileNumber(): string {
                return this._mobileNumber;
            }

            set mobileNumber(value: string) {
                this._mobileNumber = value;
            }
        }
    }

    export namespace util {
        import Person = accept.model.Person;

        function getEntities<T>(url: string, data: any, callback: (list: T[]) => void): void {
            $.ajax({
                url: url,
                type: "GET",
                data: data,
                async: false,
                success: function (data) {
                    callback(data);
                },
                error: function (data) {
                    callback(null);
                }
            });
        }

        export class Loader {
            public static load() {
                let persons = this.getPersons();
                persons.forEach(function (person) {
                    
                });
            }

            private static getPersons(): Person[] {
                let result:Person[] = null;
                $.ajax({
                    type: "get",
                    url: "/apply/findPersons",
                    data: {appId: "00001"},
                    async: false,
                    success: function (data) {
                        result = data;
                    }
                });
                return result;
            }
        }
    }
}