import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const jwtHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  

  if (req.url.endsWith("/api/connexion")) {
    return next(req);
  }




  const authRequest = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${ authService.token }`
    }
  });

  

  return next(authRequest).pipe(
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        authService.logout(); // Nettoie le token si besoin
        router.navigate(['']); // Redirige vers connexion
      }
      return throwError(() => err);
    })
  );
};
