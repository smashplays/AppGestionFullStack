import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoTerminadoComponent } from './listado-terminado/listado-terminado.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterTerminadoPipe } from './filter-terminado.pipe';
import { OutletComponent } from './outlet/outlet.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ListadoTerminadoComponent,
    FilterTerminadoPipe,
    OutletComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
  ],
})
export class TerminadoModule {}
