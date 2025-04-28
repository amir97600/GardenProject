import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { environment } from '../../environment';
import { Jardin } from '../model/jardin';

@Injectable({
  providedIn: 'root'
})
export class JardinService {

  constructor(private http : HttpClient) { }

  private refresh$: Subject<void> = new Subject<void>();
  private API_URL: string = `${ environment.API_URL }/jardin`;
  
  public refresh() {
    this.refresh$.next();
  }
  
  public findAll(): Observable<Jardin[]> {
  
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<Jardin[]>(this.API_URL)
      })
    );
  }
  
  public findById(id : number): Observable<Jardin> {
    return this.http.get<Jardin>(`${ this.API_URL }/${ id }`);
  }

  public findByNom(nom : string): Observable<Jardin> {
    return this.http.get<Jardin>(`${ this.API_URL }/nom/${ encodeURIComponent(nom) }`);
  }
  
  public save(jardin: any) {
    if (jardin.numero) {
      return this.http.put<Jardin>(`${ this.API_URL }/${ jardin.numero }`, jardin);
    }
      
    return this.http.post<Jardin>(this.API_URL, jardin);
  }
    
  public delete(jardin: any) {
    return this.http.delete<void>(`${ this.API_URL }/jardin/${ jardin.numero }`);
  }
}
