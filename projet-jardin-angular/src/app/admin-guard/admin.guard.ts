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
    const role = this.service.role;

    if (role === 'ROLE_ADMIN') {
      return true;
      
    }

    else{
      this.router.navigate(['/403']);
      return false;
    }
    
  }
}
