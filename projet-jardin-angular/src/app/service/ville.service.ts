import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  private API_URL: string = `${ environment.apiVille }`;

  constructor(private http: HttpClient) {}

  getVilleByCodePostal(codePostal: string): Observable<string[]> {
  return this.http.get<any[]>(`${this.API_URL}${codePostal}`)
    .pipe(
      map(response => response.map(ville => ville.nom)) 
    );
  }

  getCodePostalByVille(ville: string): Observable<string> {
    const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(ville)}&fields=code,codesPostaux&format=json`;
    return this.http.get<any[]>(url).pipe(
      map(result => result[0]?.codesPostaux?.[0] || '') // renvoie le premier code postal
    );
  }
  

}
