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
    console.log('Service:', this.service);
    console.log('Role:', this.service.role);
    const role = this.service.role; // adapte au nom de ta méthode

    if (role === 'ROLE_ADMIN') {
      console.log(role);
      return true;
      
    }

    else{
      this.router.navigate(['/403']);
      console.log(role);
      return false;
    }
    
  }
}
