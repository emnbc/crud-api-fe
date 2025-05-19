import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from './http.service';
import { catchError, map, of, tap } from 'rxjs';
import { ILoginForm, IUserData } from '../models/auth.interface';
import { HttpClient } from '@angular/common/http';

const TOKEN = 'access-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);

  private _user: IUserData | null = null;

  logOut() {
    this._user = null;
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/sign-in']);
  }

  logIn(data: ILoginForm) {
    return this.http.post(BASE_URL + '/auth/login', data, {
      responseType: 'text',
    });
  }

  getUserData() {
    // TODO: Replace with actual API call to get user data
    return this.http.get<IUserData>(BASE_URL + '/users').pipe(
      tap(
        () =>
          (this._user = {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            createdAt: '2025-01-01',
          })
      )
    );
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
