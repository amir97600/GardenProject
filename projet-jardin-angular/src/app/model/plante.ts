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

    public get planteType() : TypePlante {
        return this.planteType;
    }

    public set planteType(value : TypePlante){
        this.planteType = value;
    }

    public get id(): number {
        return this.id;
      }
    
      public set id(value: number) {
        this.id = value;
      }
    
      public get delaiArrosage(): number {
        return this.delaiArrosage;
      }
    
      public set delaiArrosage(value: number) {
        this.delaiArrosage = value;
      }
    
      public get delaiRecolte(): number {
        return this.delaiRecolte;
      }
    
      public set delaiRecolte(value: number) {
        this.delaiRecolte = value;
      }
    
      public get description(): string {
        return this.description;
      }
    
      public set description(value: string) {
        this.description = value;
      }

      public get conseil(): string {
        return this.conseil;
      }
    
      public set conseil(value: string) {
        this.conseil = value;
      }
    
      public get dureeVie(): number {
        return this.dureeVie;
      }
    
      public set dureeVie(value: number) {
        this.dureeVie = value;
      }

      public get nom(): string {
        return this.nom;
      }
    
      public set nom(value: string) {
        this.nom = value;
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

