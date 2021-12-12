import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiciosBackendService {
  urlBackend = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getDatos(ruta: string): Observable<any> {
    return this.http.get(this.urlBackend + ruta);
  }

  agregarDatos(ruta: string, datos: string): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(this.urlBackend + ruta, datos, headers);
  }

  validarCredenciales(ruta: string, credenciales: string): Observable<any> {
    const filtro = '{ "where" : ' + credenciales + '}';
    const filtroEncode = encodeURIComponent(filtro);
    const url = this.urlBackend + ruta + '?filter=' + filtroEncode;
    return this.http.get(url);
  }
}
