import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioGlobalService } from '../servicios/servicio-global.service';
import { ServiciosBackendService } from '../servicios/servicios-backend.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  tituloLogin: String = 'Iniciar Sesión';
  correo: String = '';
  password: String = '';

  //formLogin = new FormGroup({
  //codigo: new FormControl(''),
  //password: new FormControl(''),
  //});

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
      password: ['', Validators.required],
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
      this.formLogin.controls['password'].value
    );
    this.formLogin.controls.password.setValue(contraseniaEncriptada);

    const credenciales = this.formLogin.getRawValue();

    this.servicioBackend
      .validUser('/usuarios', JSON.stringify(credenciales))
      .subscribe(
        (response) => {
          if (response) {
            if (response.length > 0) {
              alert('Felicidades');
            } else {
              alert('Las credenciales son incorrectas');
            }
          } else {
            alert('Ocurrió un error');
          }
        },
        (error) => {
          console.log('error');
        },
        () => {
          console.log('Completado');
        }
      );

    this.clickLogin = true;

    this.router.navigate(['/']);
  }

  setToggleForm() {
    this.toggleForm = !this.toggleForm;
  }
}
