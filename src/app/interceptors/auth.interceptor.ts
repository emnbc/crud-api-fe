import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const newReq = authService.token
    ? req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${authService.token}`
        ),
      })
    : req;

  return next(newReq).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          // Http Response
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          // Http Error Response
          if (err.status === 401 || err.status === 403) {
            authService.logOut();
            setTimeout(() => {
              router.navigate(['/sign-in']);
            }, 1000);
          }
        }
      },
      complete: () => {
        console.error('HTTP Request completed');
      },
    })
  );
};
