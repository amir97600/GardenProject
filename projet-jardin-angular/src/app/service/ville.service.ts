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

  getVilleByCodePostal(codePostal: string): Observable<String> {
    return this.http.get<any>(`${this.API_URL}${codePostal}`)
      .pipe(
        map(response => response[0].nom) 
      );
  }

}
