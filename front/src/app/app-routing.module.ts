import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login-routing.module').then((m) => m.LoginRoutingModule),
  },
  {
    path: 'agenda',
    loadChildren: () =>
      import('./agenda/agenda-routing.module').then(
        (m) => m.AgendaRoutingModule
      ),
  },
  {
    path: 'incidencia',
    loadChildren: () =>
      import('./incidencia/incidencia-routing.module').then(
        (m) => m.IncidenciaRoutingModule
      ),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./cliente/cliente-routing.module').then(
        (m) => m.ClienteRoutingModule
      ),
  },
  {
    path: 'terminado',
    loadChildren: () =>
      import('./terminado/terminado-routing.module').then(
        (m) => m.TerminadoRoutingModule
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
