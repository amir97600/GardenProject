import { TypePlante } from "./type-plante";

export class Plante {

  constructor(
    private _planteType: TypePlante,
    private _id: number,
    private _delaiArrosage: number,
    private _delaiRecolte: number,
    private _description: string,
    private _conseil: string,
    private _dureeVie: number,
    private _nom: string,
    private _comestibilite ?: boolean,
    private _icone ?: string,
    private _image ?: string,
  ) { }

  public get planteType(): TypePlante {
    return this._planteType;
  }

  public set planteType(value: TypePlante) {
    this._planteType = value;
  }



  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get delaiArrosage(): number {
    return this._delaiArrosage;
  }

  public set delaiArrosage(value: number) {
    this._delaiArrosage = value;
  }

  public get delaiRecolte(): number {
    return this._delaiRecolte;
  }

  public set delaiRecolte(value: number) {
    this._delaiRecolte = value;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  public get conseil(): string {
    return this._conseil;
  }

  public set conseil(value: string) {
    this._conseil = value;
  }

  public get dureeVie(): number {
    return this._dureeVie;
  }

  public set dureeVie(value: number) {
    this._dureeVie = value;
  }

  public get nom(): string {
    return this._nom;
  }

  public set nom(value: string) {
    this._nom = value;
  }

  public get icone(): string | undefined {
    return this._icone;
  }
    
  public set icone(value: string) {
    this._icone = value;
  }

  public get image(): string | undefined {
    return this._image;
  }
    
  public set image(value: string) {
    this._image = value;
  }

  public get comestibilite(): boolean | undefined {
    return this._comestibilite;
  }
    
  public set comestibilite(value: boolean) {
    this._comestibilite = value;
  }

}

