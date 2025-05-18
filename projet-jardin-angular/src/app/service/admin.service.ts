import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private refresh$: Subject<void> = new Subject<void>();
  private API_URL: string = `${ environment.apiUrl }/utilisateur`;

  constructor(private http: HttpClient) { }

  public refresh() {
    this.refresh$.next();
  }

  public findAll(): Observable<Admin[]> {
    return this.refresh$.pipe(
      // Pour forcer une première initialisation de la liste
      startWith(null),
      
      // Transformer le "void" en Array<Todo> en allant chercher les infos
      switchMap(() => {
        return this.http.get<Admin[]>(`${ this.API_URL }/admin`)
      })
    );
  }

  public findByLogin(login:string): Observable<Admin>{
    return this.http.get<Admin>(`${this.API_URL}/admin/bylogin/${login}`)
  }

  public save(admin: Admin) {
    if (admin.id) {
      return this.http.put<Admin>(`${ this.API_URL }/admin/${ admin.id }`, admin);
    }
    
    return this.http.post<Admin>(`${ this.API_URL }/admin`, {
      login: admin.login,
      password: admin.password
    });
  }
  
  public delete(Admin: any) {
    return this.http.delete<void>(`${ this.API_URL }/${ Admin.id }`);
  }
}
