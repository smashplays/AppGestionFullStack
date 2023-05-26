import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from './outlet/outlet.component';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AuthGuard } from '../auth.guard';
import { RoleGuard } from '../role.guard';

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: 'listado',
        component: ListadoUsuarioComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'editar/:id',
        component: EditarUsuarioComponent,
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
export class AuthRoutingModule {}
