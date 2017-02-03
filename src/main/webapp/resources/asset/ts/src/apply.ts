class Person {
    private _customerName: string;
    private _cardType: string;
    private _cardNumber: string;
    private _expirationDate: Date;
    private _mobileNumber: string;


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

    public toString(): string {
        return this._customerName;
    }
}