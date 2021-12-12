import { Component, OnInit } from '@angular/core';
import { ServicioGlobalService } from '../servicios/servicio-global.service';

@Component({
  selector: 'admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.scss'],
})
export class AdminUsuarioComponent implements OnInit {
  constructor(private servicioGlobal: ServicioGlobalService) {
    const ruta = this.servicioGlobal.rutaActual;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.servicioGlobal.rutaActual = 'admin-usuario';
    });
  }
}
