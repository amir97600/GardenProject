export class BadgeClass {
    
    constructor(
        private _client_id:number,
        private _badge:string,
    ){}

    public get client_id():number{
        return this._client_id
    }

    public set client_id(client_id:number){
        this.client_id = client_id;
    }

    public get badge():string{
        return this.badge
    }

    public set badge(badge:string){
        this.badge = badge;
    }
}
