export class Culture {

    private _id: number = 0;
    private _datePlantation: string;
    private _dateDernierArrosage: string;
    private _quantite: number;
    private _recolte: boolean;
    private _idJardin: number;
    private _idPlante: number;
    private _planteType: string;
  
    constructor(
      datePlantation: string,
      dateDernierArrosage: string,
      quantite: number,
      idJardin: number,
      idPlante: number,
      planteType: string,
      recolte: boolean
    ) {
      this._datePlantation = datePlantation;
      this._dateDernierArrosage = dateDernierArrosage;
      this._quantite = quantite;
      this._idJardin = idJardin;
      this._idPlante = idPlante;
      this._planteType = planteType;
      this._recolte = recolte;
    }
  
    public get id(): number {
      return this._id;
    }
  
    public set id(value: number) {
      this._id = value;
    }
  
    public get datePlantation(): string {
      return this._datePlantation;
    }
  
    public set datePlantation(value: string) {
      this._datePlantation = value;
    }
  
    public get dateDernierArrosage(): string {
      return this._dateDernierArrosage;
    }
  
    public set dateDernierArrosage(value: string) {
      this._dateDernierArrosage = value;
    }
  
    public get quantite(): number {
      return this._quantite;
    }
  
    public set quantite(value: number) {
      this._quantite = value;
    }
  
    public get recolte(): boolean {
      return this._recolte;
    }
  
    public set recolte(value: boolean) {
      this._recolte = value;
    }
  
    public get idJardin(): number {
      return this._idJardin;
    }
  
    public set idJardin(value: number) {
      this._idJardin = value;
    }
  
    public get idPlante(): number {
      return this._idPlante;
    }
  
    public set idPlante(value: number) {
      this._idPlante = value;
    }
  
    public get planteType(): string {
      return this._planteType;
    }
  
    public set planteType(value: string) {
      this._planteType = value;
    }
  }
  