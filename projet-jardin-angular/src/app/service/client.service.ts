import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { environment } from '../../app/environment/environment';
import { Client } from '../model/client';
import { Badge } from '../model/badge';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }

  private refresh$: Subject<void> = new Subject<void>();
  private API_URL: string = `${ environment.apiUrl }/utilisateur/client`;

  public refresh() {
    this.refresh$.next();
  }

  public findAll(): Observable<Client[]> {

    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<Client[]>(this.API_URL)
      })
    );
  }

  public findById(id : number): Observable<Client> {
    return this.http.get<Client>(`${ this.API_URL }/${ id }`);
  }

  public findByLogin(login : string): Observable<Client> {
    return this.http.get<Client>(`${ this.API_URL }/bylogin/${login}`);
  }

  public save(client: Client) {
    if (client.id) {
      return this.http.put<Client>(`${ this.API_URL }/${ client.id }`, client);
    }
    
    return this.http.post<Client>(this.API_URL, {
      login: client.login,
      password: client.password,
      nom: client.nom,
      prenom: client.prenom,
      idJardin: client.idJardin,
      score: client.score,
      email : client.email
    });
  }
  
  public delete(client: any) {
    return this.http.delete<void>(`${ environment.apiUrl }/utilisateur/${ client.id }`);
  }

  getBadgesDebloques(client : Client, badges : string[]) : string[]{
    badges = Object.entries(Badge)
    .filter(([nom, valeur]) => 
    typeof valeur === 'number' && client.score >= valeur)
    .map(([nom]) => nom );
    return badges;
  }

}
