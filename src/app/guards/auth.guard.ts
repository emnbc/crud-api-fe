import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const checkLogin = () => {
    return auth.checkAuth().pipe(
      map((res) => {
        if (res) {
          return true;
        } else {
          return router.parseUrl('/sign-in');
        }
      })
    );
  };

  return checkLogin();
};
