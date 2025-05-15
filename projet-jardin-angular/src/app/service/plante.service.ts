import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../..//app/environment/environment';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Plante } from '../model/plante';

@Injectable({
  providedIn: 'root'
})
export class PlanteService {

  constructor(private http: HttpClient) { }

  private refresh$: Subject<void> = new Subject<void>();
  private API_URL: string = `${ environment.apiUrl }/plante`;

  public refresh() {
    this.refresh$.next();
  }

  public findAll(): Observable<Plante[]>{

    return this.refresh$.pipe(
          startWith(null),
          switchMap(() => {
            return this.http.get<Plante[]>(this.API_URL)
          })
        );

  }

   public save(plante: Plante) {

    console.log(plante);
      if (plante.id) {
        return this.http.put<Plante>(`${ this.API_URL }/${ plante.id }`, {
          id: plante.id,
          delaiArrosage: plante.delaiArrosage,
          delaiRecolte: plante.delaiRecolte,
          description: plante.description,
          conseil: plante.conseil,
          dureeVie: plante.dureeVie,
          nom: plante.nom,
          planteType: plante.planteType,
          image: plante.image,
          icone: plante.icone,
        });
      }
        
      return this.http.post<Plante>(this.API_URL, {
        delaiArrosage: plante.delaiArrosage,
        delaiRecolte: plante.delaiRecolte,
        description: plante.description,
        conseil: plante.conseil,
        dureeVie: plante.dureeVie,
        nom: plante.nom,
        planteType: plante.planteType,
        image: plante.image,
        icone: plante.icone,
      });
    }
      
    public delete(plante: Plante) {
      return this.http.delete<void>(`${ this.API_URL }/${ plante.id }`);
    }

  public findById(id: number): Observable<Plante> {
      return this.http.get<Plante>(`${this.API_URL}/${id}`);
    }


}
