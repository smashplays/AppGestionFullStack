import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { OutletComponent } from './outlet/outlet.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ListadoUsuarioComponent,
    EditarUsuarioComponent,
    OutletComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
  ],
})
export class AuthModule {}
