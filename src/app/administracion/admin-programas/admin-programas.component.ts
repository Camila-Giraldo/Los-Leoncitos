import { Component, OnInit } from '@angular/core';
import { ServicioGlobalService } from '../../servicios/servicio-global.service';
import Swal from 'sweetalert2';
import { Validators, FormBuilder } from '@angular/forms';
import { ServiciosBackendService } from '../../servicios/servicios-backend.service';
@Component({
  selector: 'admin-programas',
  templateUrl: './admin-programas.component.html',
  styleUrls: ['./admin-programas.component.scss'],
})
export class AdminProgramasComponent implements OnInit {
  nuevoPrograma = false;
  formPrograma: any;

  tipoPrograma = [
    {
      codigo: '',
      texto: 'Todos',
    },
    {
      codigo: 'Curso-Virtual',
      texto: 'Curso-Virtual',
    },
    {
      codigo: 'Pregrado-Presencial',
      texto: 'Pregrado-Presencial',
    },
  ];

  selectTipoPrograma = 'Pregrado-Presencial';

  listaProgramas: any[] = [];
  listaTodosProgramas: any[] = [];

  modoCrud = 'adicion';

  textoFiltro = '';

  idActual = '';

  constructor(
    private servicioGlobal: ServicioGlobalService,
    private servicioBackend: ServiciosBackendService,
    private formBuilder: FormBuilder
  ) {
    this.formPrograma = formBuilder.group({
      nombre: ['', Validators.required],
      tipo: [''],
      codigo: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', Validators.required],
      creditos: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
    });

    this.obtenerProgramas();
    const ruta = this.servicioGlobal.rutaActual;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.servicioGlobal.rutaActual = 'admin-programas';
    });
  }

  obtenerProgramas(): void {
    this.servicioBackend.getDatos('/programa-academicos').subscribe({
      next: (datos) => {
        this.listaTodosProgramas = datos;
        this.listaProgramas = datos;
      },
      error: (e) => {
        console.log('El error es: ' + e);
      },
      complete: () => {
        console.log('Completado');
      },
    });
  }

  iniciarCreacion(): void {
    this.nuevoPrograma = !this.nuevoPrograma;
    this.modoCrud = 'adicion';
  }

  async crearPrograma(): Promise<void> {
    if (!this.selectTipoPrograma) {
      Swal.fire({
        title: 'Oops, tienes un error!',
        text: 'Selecciona tipo de programa válido',
        icon: 'error',
        confirmButtonText: 'Vale',
      });
      return;
    }

    const programa = this.formPrograma.getRawValue();
    programa.tipo = this.selectTipoPrograma;
    this.servicioBackend
      .agregarDatos('/programa-academicos', JSON.stringify(programa))
      .subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          Swal.fire({
            title: '¡Excelente!',
            text: 'Se ha creado un nuevo programa',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          this.obtenerProgramas();
          this.formPrograma.reset();
          this.nuevoPrograma = false;
        },
        error: (e) => {
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo agregar',
            icon: 'error',
            confirmButtonText: 'Vale',
          });
        },
        complete: () => {
          console.log('Completado');
        },
      });
  }

  iniciarEdicion(programa: any): void {
    this.idActual = programa.id;
    this.formPrograma.patchValue(programa);
    this.nuevoPrograma = true;
    this.modoCrud = 'edicion';
  }

  editarPrograma(): void {
    const programaModificado = this.formPrograma.getRawValue();

    this.servicioBackend
      .cambiarDatos('/programa-academicos', programaModificado, this.idActual)
      .subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          Swal.fire({
            title: '¡Excelente!',
            text: 'Se ha modificado el programa',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          this.obtenerProgramas();
          this.formPrograma.reset();
          this.nuevoPrograma = false;
        },
        error: (e) => {
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo modificar',
            icon: 'error',
            confirmButtonText: 'Vale',
          });
        },
        complete: () => {
          console.log('Completado');
        },
      });
  }

  eliminarProgramas(id: string): void {
    this.servicioBackend.eliminarDatos('/programa-academicos', id).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        Swal.fire({
          title: '¡Ojo!',
          text: 'Se ha eliminado el programa',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
        this.obtenerProgramas();
      },
      error: (e) => {
        Swal.fire({
          title: '¡Oops!',
          text: 'No se pudo eliminar',
          icon: 'error',
          confirmButtonText: 'Vale',
        });
      },
      complete: () => {
        console.log('Completado');
      },
    });
  }

  filtarProgramaPorTipo(): void {
    if (this.selectTipoPrograma) {
      const programasPorTipo = this.listaTodosProgramas.filter(
        (programa) => programa.tipo == this.selectTipoPrograma
      );
      if (programasPorTipo) {
        this.listaProgramas = programasPorTipo;
      }
    } else {
      this.listaProgramas = this.listaTodosProgramas;
    }
  }

  filtrarPorTexto(): void {
    const programasFiltrados = this.listaTodosProgramas.filter((programa) => {
      let coincide = false;
      for (const atributo in programa) {
        const valor = (programa[atributo] + '').toLowerCase();

        if (atributo == 'id') {
          continue;
        }

        if (valor.includes(this.textoFiltro.toLowerCase())) {
          coincide = true;
          break;
        }
      }
      return coincide;
    });
    this.listaProgramas = programasFiltrados;
  }
}
