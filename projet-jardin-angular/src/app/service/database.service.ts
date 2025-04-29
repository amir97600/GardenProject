import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http:HttpClient) { }

  public refresh() {
    this.refresh$.next();
  }

  public getTables(): Observable<String[]> {
    return this.refresh$.pipe(
      // Pour forcer une première initialisation de la liste
      startWith(null),
      
      // Transformer le "void" en Array<Todo> en allant chercher les infos
      switchMap(() => {
        return this.http.get<String[]>('http://localhost:8080/api/database/tables');
      })
    );
  }

 

}
