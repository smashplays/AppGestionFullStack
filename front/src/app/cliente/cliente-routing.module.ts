import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from './outlet/outlet.component';
import { AuthGuard } from '../auth.guard';
import { RoleGuard } from '../role.guard';
import { ListadoClienteComponent } from './listado-cliente/listado-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: 'listado',
        component: ListadoClienteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:id',
        component: EditarClienteComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: '**',
        redirectTo: 'listado',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
