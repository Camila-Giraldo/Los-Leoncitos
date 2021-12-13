import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuarioComponent } from './administracion/admin-usuario/admin-usuario.component';
import { LoginComponent } from './login/login.component';
import { ProgramasOfertaComponent } from './programas-oferta/programas-oferta.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { AdminProgramasComponent } from './administracion/admin-programas/admin-programas.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin-usuario',
    component: AdminUsuarioComponent,
  },
  {
    path: 'programas-oferta',
    component: ProgramasOfertaComponent,
  },
  {
    path: 'administracion',
    component: AdministracionComponent,
  },
  {
    path: 'admin-programas',
    component: AdminProgramasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
