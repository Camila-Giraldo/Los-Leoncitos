import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {
  Grupo, Usuario, UsuarioPorGrupo
} from '../models';
import {GrupoRepository, UsuarioPorGrupoRepository} from '../repositories';

export class GrupoUsuarioController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
    @repository(UsuarioPorGrupoRepository) protected usuarioPorGrupoRepository: UsuarioPorGrupoRepository,
  ) { }

  @get('/grupos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Grupo has many Usuario through UsuarioPorGrupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.grupoRepository.usuarios(id).find(filter);
  }

  @post('/grupo-por-usuario', {
    responses: {
      '200': {
        description: 'create a Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioPorGrupo)}},
      },
    },
  })

  async createRelation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPorGrupo, {
            title: 'NewUserWithGroup',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<UsuarioPorGrupo, 'id'>,
  ): Promise<UsuarioPorGrupo | null> {
    let registro = await this.usuarioPorGrupoRepository.create(datos)
    return registro
  }

  @patch('/grupos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Grupo.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.grupoRepository.usuarios(id).patch(usuario, where);
  }

  @del('/grupos/{id_grupo}/{id_usuario}')
  @response(204, {
    description: 'relation DELETE success'
  })
  async delete(
    @param.path.string('id_grupo') id_grupo: string,
    @param.path.string('id_usuario') id_usuario: string
  ): Promise<Boolean> {
    let reg = await this.usuarioPorGrupoRepository.findOne({
      where: {
        grupoId: id_grupo,
        usuarioId: id_usuario
      }
    })
    if (reg) {
      await this.usuarioPorGrupoRepository.deleteById(reg.id)
      return true
    }
    return false
  }

  @get('/grupos-usuarios')
  @response(200, {
    description: 'Array of UsuarioPorGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioPorGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async findAll(
    @param.query.object('filter') filter?: Filter<UsuarioPorGrupo>,
  ): Promise<UsuarioPorGrupo[]> {
    return this.usuarioPorGrupoRepository.find(filter);
  }
}
