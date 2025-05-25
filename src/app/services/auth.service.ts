import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL, HttpService } from './http.service';
import { catchError, map, of, tap } from 'rxjs';
import { ILoginForm, IUserData } from '../models/auth.interface';

const TOKEN = 'access-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpService);

  private _user: IUserData | null = null;

  logOut() {
    this._user = null;
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/sign-in']);
  }

  logIn(data: ILoginForm) {
    return this.http.post<{ accessToken: string }>('/auth/login', data);
  }

  getUserData() {
    return this.http
      .get<IUserData>('/users/me')
      .pipe(tap((user) => (this._user = user)));
  }

  checkAuth() {
    if (this.isLoggedIn) {
      return of(true);
    } else if (this.token) {
      return this.getUserData().pipe(
        map(() => true),
        catchError(() => of(false))
      );
    } else {
      return of(false);
    }
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  get user() {
    return this._user;
  }

  get isLoggedIn() {
    return !!this._user?.email;
  }

  get token() {
    return localStorage.getItem(TOKEN);
  }
}
