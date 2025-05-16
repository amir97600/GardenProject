import { Culture } from "../cultures/culture";

export class Jardin {

    private _numero : number = 0;
    private _cultures : Culture[] = [];
    

    constructor(private _nom : string, private _lieu : string) {}

    public get numero() : number {
        return this._numero;
    }

    public set numero(value: number) {
        this._numero = value;
    }

    public get nom() : string {
        return this._nom;
    }

    public set nom(value: string) {
        this._nom = value;
    }

    public get cultures() : Culture[] {
        return this._cultures;
    }

    public set cultures(value: Culture[]) {
        this._cultures = value;
    }

    public get lieu() : string {
        return this._lieu;
    }

    public set lieu(value: string) {
        this._lieu = value;
    }


}
