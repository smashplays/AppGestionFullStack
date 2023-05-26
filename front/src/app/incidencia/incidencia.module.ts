import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { MainComponent } from './main/main.component';
import { EditarComponent } from './editar/editar.component';
import { GeneradoComponent } from './generado/generado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { OutletComponent } from './outlet/outlet.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ListadoComponent,
    MainComponent,
    EditarComponent,
    GeneradoComponent,
    FilterPipe,
    OutletComponent,
  ],
  exports: [FilterPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MaterialModule,
  ],
})
export class IncidenciaModule {}
