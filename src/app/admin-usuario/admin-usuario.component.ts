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

  modoCrud = 'adicion';

  idActual = '';

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
      contrasenia: ['b59c67bf196a4758191e42f76670ceba'],
      fechaRegistro: ['', Validators.required],
      rolId: ['', Validators.required],
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

  iniciarCreacion(): void {
    this.nuevoUsuario = !this.nuevoUsuario;
    this.modoCrud = 'adicion';
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
            confirmButtonText: 'Cool',
          });
          this.obtenerUsuarios();
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

  iniciarEdicion(usuario: any): void {
    this.idActual = usuario.id;
    this.formUsuario.patchValue(usuario);
    this.nuevoUsuario = true;
    this.modoCrud = 'edicion';
  }

  editarUsuario(): void {
    const usuarioModificado = this.formUsuario.getRawValue();

    this.servicioBackend
      .cambiarDatos('/usuarios', usuarioModificado, this.idActual)
      .subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          Swal.fire({
            title: '¡Excelente!',
            text: 'Se ha modificado el usuario',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          this.obtenerUsuarios();
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

  eliminarUsuario(id: string): void {
    this.servicioBackend.eliminarUsuario('/usuarios', id).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        Swal.fire({
          title: '¡Ojo!',
          text: 'Se ha eliminado el usuario',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
        this.obtenerUsuarios();
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
}
