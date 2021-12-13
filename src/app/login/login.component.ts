import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioGlobalService } from '../servicios/servicio-global.service';
import { ServiciosBackendService } from '../servicios/servicios-backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  tituloLogin: String = 'Iniciar Sesión';
  correo: String = '';
  contrasenia: String = '';

  formLogin: any;

  clickLogin: boolean = false;
  toggleForm = true;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private servicioGlobal: ServicioGlobalService,
    private servicioBackend: ServiciosBackendService
  ) {
    this.formLogin = fb.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contrasenia: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.servicioGlobal.rutaActual = 'login';
    });
  }

  autenticar(): void {
    const contraseniaEncriptada = Md5.hashStr(
      this.formLogin.controls['contrasenia'].value
    );
    this.formLogin.controls.contrasenia.setValue(contraseniaEncriptada);

    const credenciales = this.formLogin.getRawValue();

    this.servicioBackend
      .validarCredenciales(JSON.stringify(credenciales))
      .subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            if (response.tk) {
              Swal.fire({
                title: '¡Bienvenido!',
                text: 'Ha iniciado sesión satisfactoriamente',
                icon: 'success',
                confirmButtonText: 'Vale',
              });

              localStorage.setItem('tkEduFree', response.tk);
              this.servicioBackend.token = response.tk;
              this.servicioBackend.isAutenticate = true;

              this.router.navigate(['/admin-usuario'])

            } else {
              alert ('Las credenciales son incorrectas')
            }
          } else {
            alert('Ups ocurrió un error');
          }
        },
        error: (error) => {
          console.log('error');

          if (error.status == 401){
            Swal.fire({
              title: 'Error en las credenciales',
              text: 'Ha ingresado unas credenciales erróneas',
              icon: 'error',
              confirmButtonText: 'Vale',
            });
          }

        },
        complete: () => {
          console.log('se completó');
        },
      });
  }

  setToggleForm() {
    this.toggleForm = !this.toggleForm;
  }
}
