import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUsuarioComponent } from './admin-usuario/admin-usuario.component';
import { ProgramasOfertaComponent } from './programas-oferta/programas-oferta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminUsuarioComponent,
    ProgramasOfertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
