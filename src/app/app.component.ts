import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioGlobalService } from './servicios/servicio-global.service';
import { ServiciosBackendService } from './servicios/servicios-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'edufreeFrontend';

  constructor(
    public servicioGlobal: ServicioGlobalService,
    public servicioBackend: ServiciosBackendService,
    private router: Router
  ) {
    const ruta = this.servicioGlobal.rutaActual;
  }

  routeLogin(): void {
    this.router.navigate(['/login']);
  }
  routeProgramas(): void {
    this.router.navigate(['/programas-oferta']);
  }
  routeAdminUsuarios(): void {
    this.router.navigate(['/admin-usuario']);
  }
}
