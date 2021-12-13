import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiciosBackendService {
  urlBackend = 'http://localhost:3000/';
  token: string = '';
  isAutenticate = false;

  constructor(private http: HttpClient) {
    this.cargarToken();
  }

  cerrarSesion() {
    this.token = '';
    this.isAutenticate = false;
    localStorage.removeItem('tkEduFree');
  }

  cargarToken() {
    const token = localStorage.getItem('tkEduFree');
    if (token) {
      this.token = token;
      this.isAutenticate = true;
    }
  }

  getDatos(ruta: string): Observable<any> {
    return this.http.get(this.urlBackend + ruta, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  agregarDatos(ruta: string, datos: string): Observable<any> {
    return this.http.post(this.urlBackend + ruta, datos, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  validarCredenciales(credenciales: string): Observable<any> {
    const url = this.urlBackend + '/login';
    return this.http.post(url, credenciales, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  cambiarDatos(ruta: string, datos: string, id: string): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.patch(this.urlBackend + ruta + '/' + id, datos, headers);
  }

  eliminarUsuario(ruta: string, id: string): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete(this.urlBackend + ruta + '/' + id, headers);
  }
}
