
import { Jardin } from '../../jardin/jardin';
import { Badge } from './badge';

export class Client {

    private _id : number = 0;
    private _score : number =0;
    private _badges : Badge[]= [];

    constructor(
        private _nom : string,
        private _prenom : string, 
        private _login : string, 
        private _password : string, 
        private _jardin : Jardin
    ) {}

    get id() : number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    get prenom() : string {
        return this._prenom;
    }

    public set prenom(value: string) {
        this._prenom = value;
    }

    get nom() : string {
        return this._nom;
    }

    public set nom(value: string) {
        this._nom = value;
    }

    get login() : string {
        return this._login;
    }

    public set login(value: string) {
        this._login = value;
    }

    get password() : string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    get score() : number {
        return this._score;
    }

    public set score(value: number) {
        this._score = value;
    }

    get badges() : Badge[] {
        return this._badges;
    }

    public set badges(value: Badge[]) {
        this._badges = value;
    }

    get jardin() : Jardin {
        return this._jardin;
    }

    public set jardin(value: Jardin) {
        this._jardin = value;
    }


}
