import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  //   {
  //     path: '**',
  //     loadComponent: () =>
  //       import('./components/error/error.component').then(
  //         (m) => m.ErrorComponent
  //       ),
  //   },
];
