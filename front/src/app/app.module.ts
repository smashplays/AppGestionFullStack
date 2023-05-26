import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IncidenciaModule } from './incidencia/incidencia.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteModule } from './cliente/cliente.module';
import { TerminadoModule } from './terminado/terminado.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { AgendaModule } from './agenda/agenda.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IncidenciaModule,
    ClienteModule,
    TerminadoModule,
    AuthModule,
    LoginModule,
    AgendaModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
