import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { environment } from '../../../environment';
import { Badge } from './badge';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }

  private refresh$: Subject<void> = new Subject<void>();
  private API_URL: string = `${ environment.API_URL }/utilisateur`;

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

  public save(client: any) {
    if (client.id) {
      return this.http.put<Client>(`${ this.API_URL }/${ client.id }`, client);
    }
    
    return this.http.post<Client>(this.API_URL, client);
  }
  
  public delete(client: any) {
    return this.http.delete<void>(`${ this.API_URL }/${ client.id }`);
  }

  // Badges débloqués à partir du score du client 
  getBadgesDébloqués(score: number): Badge[] {
    return Object.values(Badge)
      .filter(value => typeof value === 'number')
      .map(v => v as number)
      .filter(val => val <= score)
      .map(val => this.badgeFromScore(val));
  }

  // convertir le score en nom du badge
  private badgeFromScore(score: number): Badge {
    return Object.keys(Badge)
      .find(key => Badge[key as keyof typeof Badge] === score) as unknown as Badge;
  }

}
