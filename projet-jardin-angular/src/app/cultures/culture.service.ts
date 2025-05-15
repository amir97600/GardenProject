import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { environment } from '../environment/environment';
import { Culture } from './culture';

@Injectable({
  providedIn: 'root'
})
export class CultureService {

  private refresh$: Subject<void> = new Subject<void>();
  private API_URL: string = `${environment.apiUrl}/culture`;

  constructor(private http: HttpClient) {}

  public refresh() {
    this.refresh$.next();
  }

  public findAll(): Observable<Culture[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<Culture[]>(this.API_URL);
      })
    );
  }

  public findById(id: number): Observable<Culture> {
    return this.http.get<Culture>(`${this.API_URL}/${id}`);
  }

  public save(culture: any): Observable<Culture> {
    
    const payload = {
    id: culture.id,
    datePlantation: culture.datePlantation,
    dateDernierArrosage: culture.dateDernierArrosage,
    quantite: culture.quantite,
    recolte: culture.recolte,
    idJardin: culture.idJardin,
    idPlante: culture.idPlante,
    planteType: culture.planteType
  };

  if (payload.id) {
    return this.http.put<Culture>(`${this.API_URL}/${payload.id}`, payload);
  }
  return this.http.post<Culture>(this.API_URL, payload);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  public arroser(id: number) {
  return this.http.put(`${this.API_URL}/${id}/arroser`, {});
}

  public recolter(id: number) {
  return this.http.put(`${this.API_URL}/${id}/recolter`, {});
  }


}