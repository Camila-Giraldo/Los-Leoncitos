import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tituloLogin: String = 'Login';
  codigo: String = '';
  password: String = '';

  //formLogin = new FormGroup({
  //codigo: new FormControl(''),
  //password: new FormControl(''),
  //});

  formLogin: any;

  clickLogin: boolean = false;
  toggleForm = true;

  constructor(fb: FormBuilder, private router: Router) {

    this.formLogin = fb.group({
      codigo: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  autenticar(): void {
    console.log(this.formLogin.getRawValue());

    const contraseñaEncriptada = Md5.hashStr(this.formLogin.controls['password'].value);
    console.log('Encriptada: ' + contraseñaEncriptada);
    //alert('la contraseña es: ' + contraseñaEncriptada)
    this.clickLogin = true;

    this.router.navigate(['/admin-usuario'])
  }

  setToggleForm() {
    this.toggleForm = !this.toggleForm;
  }

}
