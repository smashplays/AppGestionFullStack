import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoAgendaComponent } from './listado-agenda/listado-agenda.component';
import { OutletComponent } from './outlet/outlet.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListadoAgendaComponent, OutletComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AgendaModule {}
