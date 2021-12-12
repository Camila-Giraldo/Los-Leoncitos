import { Component, OnInit } from '@angular/core';
import { ServicioGlobalService } from '../servicios/servicio-global.service';
import Swal from 'sweetalert2';
import { Validators, FormBuilder } from '@angular/forms';
import { ServiciosBackendService } from '../servicios/servicios-backend.service';
@Component({
  selector: 'admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.scss'],
})
export class AdminUsuarioComponent implements OnInit {
  nuevoUsuario = false;
  formUsuario: any;

  tipoUsuario = [
    {
      codigo: 'Estudiante',
      texto: 'Estudiante',
    },
    {
      codigo: 'Profesor',
      texto: 'Profesor',
    },
    {
      codigo: 'Administrador',
      texto: 'Administrador',
    },
  ];

  selectTipoUsuario = 'Estudiante';

  listaUsuarios: any[] = [];

  constructor(
    private servicioGlobal: ServicioGlobalService,
    private servicioBackend: ServiciosBackendService,
    private formBuilder: FormBuilder
  ) {
    this.formUsuario = formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      tipo: [''],
      identificacion: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      codigo: ['', Validators.required],
      contrasenia: [''],
      fechaRegistro: [''],
      rolId: [''],
    });
    this.obtenerUsuarios();
    // const ruta = this.servicioGlobal.rutaActual;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.servicioGlobal.rutaActual = 'admin-usuario';
    });
  }

  obtenerUsuarios(): void {
    this.servicioBackend.getDatos('/usuarios').subscribe({
      next: (datos) => {
        console.log(datos);
        this.listaUsuarios = datos;
      },
      error: (e) => {
        console.log('El error es: ' + e);
      },
      complete: () => {
        console.log('Completado');
      },
    });
  }

  async crearUsuario(): Promise<void> {
    const usuario = this.formUsuario.getRawValue();
    usuario.tipo = this.selectTipoUsuario;
    this.servicioBackend
      .agregarDatos('/usuarios', JSON.stringify(usuario))
      .subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          Swal.fire({
            title: '¡Excelente!',
            text: 'Se ha creado un nuevo usuario',
            icon: 'success',
            confirmButtonText: 'Vale',
          });
          this.obtenerUsuarios()
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
}
