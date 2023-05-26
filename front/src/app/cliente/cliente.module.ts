import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidenciaModule } from '../incidencia/incidencia.module';
import { ListadoClienteComponent } from './listado-cliente/listado-cliente.component';
import { FilterClientePipe } from './filter-cliente.pipe';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { OutletComponent } from './outlet/outlet.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ListadoClienteComponent,
    FilterClientePipe,
    EditarClienteComponent,
    OutletComponent,
  ],
  exports: [FilterClientePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IncidenciaModule,
    AppRoutingModule,
    MaterialModule,
  ],
})
export class ClienteModule {}
