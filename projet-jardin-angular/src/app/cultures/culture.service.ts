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
    if (culture.id) {
      return this.http.put<Culture>(`${this.API_URL}/${culture.id}`, culture);
    }
    return this.http.post<Culture>(this.API_URL, culture);
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