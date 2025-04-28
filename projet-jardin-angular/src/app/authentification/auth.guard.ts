import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const connectService:AuthService = inject(AuthService);
  const router:Router = inject(Router);
  const hasToken:boolean = !!connectService.token;

  if(!hasToken){
    router.navigate(['/connexion'])
  }

  return true;
};
