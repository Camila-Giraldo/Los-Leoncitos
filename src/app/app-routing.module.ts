import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuarioComponent } from './admin-usuario/admin-usuario.component';
import { LoginComponent } from './login/login.component';
import { ProgramasOfertaComponent } from './programas-oferta/programas-oferta.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin-usuario',
    component: AdminUsuarioComponent
  },
  {
    path: 'programas-oferta',
    component: ProgramasOfertaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
