export class Culture {

    private _id: number = 0;
    private _datePlantation: string;
    private _dateDernierArrosage: string;
    private _idJardin: number;


    constructor(id: number, datePlantation: string, dateDernierArrosage: string, idJardin: number) {
        this._id = id;
        this._datePlantation = datePlantation;
        this._dateDernierArrosage = dateDernierArrosage;
        this._idJardin = idJardin; 
    }

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

    get idJardin(): number {
        return this._idJardin;
    }

    set idJardin(value: number) {
        this._idJardin = value;
    }
}
