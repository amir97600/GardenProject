
export class Client {

    private _id : number = 0;
    private _score : number =0;
    private _avatar? : string;

    constructor(
        private _nom : string,
        private _prenom : string, 
        private _mail : string, 
        private _login : string, 
        private _password : string, 
        private _idJardin : number,
        private _email : string
    ) {}

    public get id() : number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get prenom() : string {
        return this._prenom;
    }

    public set prenom(value: string) {
        this._prenom = value;
    }

    public get nom() : string {
        return this._nom;
    }

    public set nom(value: string){
        this._nom = value;
    }

    public set mail(value: string) {
        this._mail = value;
    }

    public get mail() : string {
        return this._mail;
    }

    public get login() : string {
        return this._login;
    }

    public set login(value: string) {
        this._login = value;
    }

    public get password() : string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get score() : number {
        return this._score;
    }

    public set score(value: number) {
        this._score = value;
    }

    public get idJardin() : number {
        return this._idJardin;
    }

    public set idJardin(value: number) {
        this._idJardin = value;
    }

    public get avatar() : any {
        return this._avatar;
    }

    public set avatar(value: string) {
        this._avatar = value;
    }

    public get email() : any {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

}
