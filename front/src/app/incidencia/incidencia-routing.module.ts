import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from './outlet/outlet.component';
import { AuthGuard } from '../auth.guard';
import { RoleGuard } from '../role.guard';
import { ListadoComponent } from './listado/listado.component';
import { EditarComponent } from './editar/editar.component';
import { MainComponent } from './main/main.component';
import { GeneradoComponent } from './generado/generado.component';

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: 'listado',
        component: ListadoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'generado/:id',
        component: GeneradoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'home',
        component: MainComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidenciaRoutingModule {}
