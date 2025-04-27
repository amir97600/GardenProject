export class Jardin {

    private _numero : number = 0;

    constructor(private _nom : string, private _superficie : number) {}

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

    public get superficie() : number {
        return this._superficie;
    }

    public set superficie(value: number) {
        this._superficie = value;
    }


}
