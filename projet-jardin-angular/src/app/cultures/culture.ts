export class Culture {

    private _id: number = 0;
    private _datePlantation: string;
    private _dateDernierArrosage: string;
    private _recolte : boolean = false; 

    constructor(
        id: number,
        datePlantation: string,
        dateDernierArrosage: string,
        private _idPlante : number,
    ) {
        this._id = id;
        this._datePlantation = datePlantation;
        this._dateDernierArrosage = dateDernierArrosage;
    }

    // Getter et Setter pour chaque attribut
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get datePlantation(): string {
        return this._datePlantation;
    }

    set datePlantation(value: string) {
        this._datePlantation = value;
    }

    get dateDernierArrosage(): string {
        return this._dateDernierArrosage;
    }

    set dateDernierArrosage(value: string) {
        this._dateDernierArrosage = value;
    }

    get recolte(): boolean {
        return this._recolte;
    }

    set recolte(value: boolean) {
        this._recolte = value;
    }

    get idPlante(): number {
        return this._idPlante;
    }

    set idPlante(value: number) {
        this._idPlante = value;
    }
}
