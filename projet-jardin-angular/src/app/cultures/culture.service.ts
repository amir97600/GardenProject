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
      startWith(null),  // Émet un événement initial à l'émission
      switchMap(() => {
        return this.http.get<Culture[]>(this.API_URL);  // Appel API pour récupérer les cultures
      })
    );
  }

  public findById(id: number): Observable<Culture> {
    return this.http.get<Culture>(`${this.API_URL}/${id}`);
  }

  public save(culture: Culture): Observable<Culture> {
    if (culture.id) {
      return this.http.put<Culture>(`${this.API_URL}/${culture.id}`, culture);  // Mise à jour d'une culture existante
    }
    return this.http.post<Culture>(this.API_URL, culture);  // Création d'une nouvelle culture
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
