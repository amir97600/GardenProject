import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const role = this.service.role; // adapte au nom de ta méthode

    if (role === 'ROLE_ADMIN') {
      return true;
    }

    // Redirection si pas admin
    this.router.navigate(['/403']);
    return false;
  }
}
