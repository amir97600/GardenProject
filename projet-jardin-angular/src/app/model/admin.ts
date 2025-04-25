export class Admin {

    constructor(
        private _id:number,
        private _login:string,
        private _password:string,
    ){}

    public get id():number{
        return this._id;
    }

    public set id(value:number){
        this._id = value;
    }

    public get login():string{
        return this._login;
    }

    public set login(value:string){
        this._login = value;
    }

    public set password(value:string){
        this._password = value;
    }

    public get password():string{
        return this._password;
    }
}
