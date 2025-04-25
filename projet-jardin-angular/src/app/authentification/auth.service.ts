import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response';
import { AuthRequest } from './auth-request';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string = "";
  private API_URL: string = `${ environment.apiUrl }/connexion`;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') as string;
  }

  public authenticate(authRequest: AuthRequest) {
    this.http.post<AuthResponse>(this.API_URL, {
      login: authRequest.login,
      password: authRequest.password
    }).subscribe(resp => {
      this.token = resp.token;
      localStorage.setItem('token', this.token)
    });
  }
}
