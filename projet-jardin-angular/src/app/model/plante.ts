import { TypePlante } from "./type-plante";

export class Plante {

    constructor(
        private _planteType : TypePlante,
        private _id : number,
        private _delaiArrosage : number,
        private _delaiRecolte : number,
        private _description : string,
        private _conseil : string,
        private _dureeVie : number,
        private _nom : string,
        private _comestible : boolean,
        private _icone ?: String
    ){}

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

      public get comestible(): boolean {
        return this.comestible;
      }
    
      public set comestible(value: boolean) {
        this.comestible = value;
      }

      public get icone(): string {
        return this.icone;
      }
    
      public set icone(value: string) {
        this.icone = value;
      }


}

