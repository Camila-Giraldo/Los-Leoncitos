import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {AutorizacionService} from '../services';
import parseBearerToken from 'parse-bearer-token';

export class EstrategiaSimple implements AuthenticationStrategy {
  name: string = 'simple';

  constructor(
    @service(AutorizacionService)
    public servicioAutorizacion: AutorizacionService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);

    try {
      if (token) {
        const respuestaToken = await this.servicioAutorizacion.validarToken(
          token,
        );
        if (respuestaToken) {
          const perfil: UserProfile = Object.assign({
            nombre: respuestaToken.data.nombre,
            correo: respuestaToken.data.correo,
            fechaRegistro: respuestaToken.data.fechaRegistro,
          });

          return perfil;
        } else {
          throw new HttpErrors[401]('Token inválido');
        }
      } else {
        throw new HttpErrors[401]('Token inválido');
      }
    } catch (error) {
      throw new HttpErrors[401]('Error al autenticar');
    }
  }
}
