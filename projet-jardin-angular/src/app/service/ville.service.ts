import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  private API_URL: string = `${ environment.API_URL }/ville`;

  constructor(private http: HttpClient) {}

  getVilleByCodePostal(codePostal: string): Observable<string> {
    return this.http.get<any>(`${this.API_URL}/${codePostal}`)
      .pipe(
        map(response => response.places[0]['place name']) 
      );
  }

}
