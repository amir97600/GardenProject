export class AuthRequest {
    constructor(private _login: string, private _password: string) { }

    public get login(): string {
        return this._login;
    }

    public set login(value: string) {
        this._login = value;
    }
    
    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }
}
