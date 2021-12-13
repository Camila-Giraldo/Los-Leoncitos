// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';

import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {Credenciales} from '../models';
import {service} from '@loopback/core';
import {AutorizacionService} from '../services';
import {authenticate} from '@loopback/authentication';

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
