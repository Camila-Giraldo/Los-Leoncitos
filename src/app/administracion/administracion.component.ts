import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioGlobalService } from '../servicios/servicio-global.service';
import { ServiciosBackendService } from '../servicios/servicios-backend.service';

@Component({
  selector: 'administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
})
export class AdministracionComponent implements OnInit {
  constructor(
    public servicioGlobal: ServicioGlobalService,
    public servicioBackend: ServiciosBackendService,
    private router: Router
  ) {
    const ruta = this.servicioGlobal.rutaActual;
  }

  ngOnInit(): void {}

  routeAdminUsuarios(): void {
    this.router.navigate(['/admin-usuario']);
  }
  routeAdminProgramas():void{
    this.router.navigate(['/admin-programas'])
  }
}
