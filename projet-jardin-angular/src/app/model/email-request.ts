export class EmailRequest {

    constructor (private _to : string,
        private _subject : string,
        private _message : string
    ) {}

    public get to() : string {
        return this._to;
    }

    public set to(value: string) {
        this._to = value;
    }
    
    public get subject() : string {
        return this._subject;
    }

    public set subject(value: string) {
        this._subject = value;
    }

    public get message() : string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }

}
