import { provideRouter, Routes, withHashLocation } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (m) => m.AboutComponent,
      ),
  },
  {
    path: 'devis/form',
    loadComponent: () =>
      import('./components/devis/devis-form/devis-form.component').then(
        (m) => m.DevisFormComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
