import { Component, OnInit } from '@angular/core';
import { ServicioGlobalService } from '../servicios/servicio-global.service';
import { ServiciosBackendService } from '../servicios/servicios-backend.service';

interface ProgramaAcademico {
  imagen: string;
  descripcion: string;
  nombre: string;
  tipo: string;
}
@Component({
  selector: 'app-programas-oferta',
  templateUrl: './programas-oferta.component.html',
  styleUrls: ['./programas-oferta.component.scss'],
})
export class ProgramasOfertaComponent implements OnInit {
  listaProgramasOferta: ProgramaAcademico[] = [];

  constructor(
    private servicioBackend: ServiciosBackendService,
    private servicioGlobal: ServicioGlobalService
  ) {
    this.getInformacionProgramas();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.servicioGlobal.rutaActual = 'programas-oferta';
    });
  }

  public getInformacionProgramas() {
    this.servicioBackend.getDatos('/programa-academicos').subscribe(
      (response) => {
        console.log('Response received');
        this.listaProgramasOferta = response;
      },
      (error) => {
        console.log('Request failed with error');
      },
      () => {
        console.error('Request completed');
      }
    );
  }
}
