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
      codigo: '',
      texto: 'Todos',
    },
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
  listaTodosUsuarios: any[] = [];

  modoCrud = 'adicion';

  textoFiltro = '';

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
        this.listaTodosUsuarios = datos;
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
    if (!this.selectTipoUsuario) {
      Swal.fire({
        title: 'Oops, tienes un error!',
        text: 'Selecciona tipo de usuario válido',
        icon: 'error',
        confirmButtonText: 'Vale',
      });
      return;
    }

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
          this.formUsuario.reset();
          this.nuevoUsuario = false;
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
          this.formUsuario.reset();
          this.nuevoUsuario = false;
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

  filtarUsuarioPorTipo(): void {
    if (this.selectTipoUsuario) {
      const usuariosPorTipo = this.listaTodosUsuarios.filter(
        (usuario) => usuario.tipo == this.selectTipoUsuario
      );
      if (usuariosPorTipo) {
        this.listaUsuarios = usuariosPorTipo;
      }
    } else {
      this.listaUsuarios = this.listaTodosUsuarios;
    }
  }

  filtrarPorTexto(): void {
    const usuariosFiltrados = this.listaTodosUsuarios.filter((usuario) => {
      let coincide = false;
      for (const atributo in usuario) {
        const valor = (usuario[atributo] + '').toLowerCase();

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
    this.listaUsuarios = usuariosFiltrados;
  }
}
