import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';

import {UsuarioRepository} from '../repositories';
import {Credenciales} from '../models';
import {service} from '@loopback/core';
import {AutorizacionService} from '../services';

export class AutenticacionController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,

    @service(AutorizacionService)
    public servicioAutorizacion: AutorizacionService,
  ) {}

  @post('/login', {
    responses: {
      '200': {
        description: 'Login usuario',
      },
    },
  })
  async login(@requestBody() credenciales: Credenciales) {
    let usuarioEncontrado = await this.servicioAutorizacion.validarUsuario(
      credenciales,
    );
    if (usuarioEncontrado) {
      const token = await this.servicioAutorizacion.generarToken(
        usuarioEncontrado,
      );

      return {
        data: {
          nombre: usuarioEncontrado.nombre,
          correo: usuarioEncontrado.correo,
          fechaRegistro: usuarioEncontrado.fechaRegistro,
        },
        tk: token,
      };
    } else {
      throw new HttpErrors[401]('Datos inválidos');
    }
  }
}
