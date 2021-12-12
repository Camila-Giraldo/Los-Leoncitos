import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Credenciales} from '../models';
import {UsuarioRepository} from '../repositories';
import {Usuario} from '../models';

const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutorizacionService {
  llaveSecreta = '***G24C4M2021###';

  constructor(
    @repository(UsuarioRepository)
    public usuarioRepositorio: UsuarioRepository,
  ) {}

  /*
   * Add service methods here
   */

  validarUsuario(usuario: Credenciales) {
    try {
      const usuarioEncontrado = this.usuarioRepositorio.findOne({
        where: {
          correo: usuario.correo,
          contrasenia: usuario.contrasenia,
        },
      });

      if (usuarioEncontrado) {
        return usuarioEncontrado;
      } else {
        return false;
      }
    } catch (error) {
      console.log('El error es: ' + error);
      return false;
    }
  }

  generarToken(usuario: Usuario) {
    try {
      const token = jwt.sign(
        {
          data: {
            id: usuario.id,
            nombre: usuario.nombre,
            identificacion: usuario.identificacion,
            direccion: usuario.direccion,
            telefono: usuario.telefono,
            correo: usuario.correo,
            fechaNacimiento: usuario.fechaNacimiento,
            codigo: usuario.codigo,
            contrasenia: usuario.contrasenia,
            fechaRegistro: usuario.fechaRegistro,
          },
        },
        this.llaveSecreta,
      );
      return token;
    } catch (error) {
      return null;
    }
  }

  validarToken(token: string) {
    try {
      let datos = jwt.verify(token, this.llaveSecreta);
      console.log(datos)
      return datos;
    } catch (error) {
      return false;
    }
  }
}
