import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const jwtHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  if (req.url.endsWith("/api/connexion")) {
    return next(req);
  }

  const authRequest = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${ authService.token }`
    }
  });

  return next(authRequest);
};
