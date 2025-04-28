export class Plante {

    constructor(
        private _type_plante : string,
        private _id : number,
        private _delai_arrossage : number,
        private _delai_recolte : number,
        private _description : string,
        private _duree_vie : number,
        private _nom : string,
        private _comestible : boolean,
    ){}

    public get type_plante() : string {
        return this._type_plante;
    }

    public set type_plante(value : string){
        this._type_plante = value;
    }

    public get id(): number {
        return this.id;
      }
    
      public set id(value: number) {
        this.id = value;
      }
    
      public get delai_arrossage(): number {
        return this.delai_arrossage;
      }
    
      public set delai_arrossage(value: number) {
        this.delai_arrossage = value;
      }
    
      public get delai_recolte(): number {
        return this.delai_recolte;
      }
    
      public set delai_recolte(value: number) {
        this.delai_recolte = value;
      }
    
      public get description(): string {
        return this.description;
      }
    
      public set description(value: string) {
        this.description = value;
      }
    
      public get duree_vie(): number {
        return this.duree_vie;
      }
    
      public set duree_vie(value: number) {
        this.duree_vie = value;
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
}
