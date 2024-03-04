import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./ui/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./ui/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sing-in',
    loadComponent: () =>
      import('./ui/pages/sing-in/sing-in.component').then(
        (m) => m.SingInComponent
      ),
  },

  {
    path: 'board',
    // canActivate: [ AuthGuard ],
    loadComponent: () =>
      import('./ui/pages/board/board.component').then((m) => m.BoardComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
