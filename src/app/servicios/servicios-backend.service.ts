import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiciosBackendService {
  urlBackend = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getDatos(ruta: string): Observable<any> {
    return this.http.get(this.urlBackend + ruta);
  }

  validUser(ruta: string, credenciales: string): Observable<any> {
    const url =
      this.urlBackend +
      ruta +
      '?filter=' +
      encodeURIComponent('{ "where" : ' + credenciales + '}');
    return this.http.get(url);
  }
}
