import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';

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
  //   {
  //     path: '**',
  //     loadComponent: () =>
  //       import('./components/error/error.component').then(
  //         (m) => m.ErrorComponent
  //       ),
  //   },
];
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withHashLocation())],
});
