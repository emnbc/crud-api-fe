import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inner-pages/inner-pages.component').then(
        (m) => m.InnerPagesComponent
      ),
    pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/inner-pages/main-page/main-page.component').then(
            (m) => m.MainPageComponent
          ),
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in-page/sign-in-page.component').then(
        (m) => m.SignInPageComponent
      ),
  },
];
