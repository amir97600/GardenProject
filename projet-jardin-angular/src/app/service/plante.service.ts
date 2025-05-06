import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../..//app/environment/environment';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Plante } from '../model/plante';

@Injectable({
  providedIn: 'root'
})
export class PlanteService {

  constructor(private http: HttpClient) { }

  private refresh$: Subject<void> = new Subject<void>();
  private API_URL: string = `${ environment.apiUrl }/plante`;

  public refresh() {
    this.refresh$.next();
  }

  public findAll(): Observable<Plante[]>{

    return this.refresh$.pipe(
          startWith(null),
          switchMap(() => {
            return this.http.get<Plante[]>(this.API_URL)
          })
        );

  }


}
