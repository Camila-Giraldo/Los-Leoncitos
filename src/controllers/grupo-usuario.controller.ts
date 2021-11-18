import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
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
} from '@loopback/rest';
import {
Grupo,
UsuarioPorGrupo,
Usuario,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoUsuarioController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
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

  @post('/grupos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'create a Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInGrupo',
            exclude: ['id'],
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.grupoRepository.usuarios(id).create(usuario);
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

  @del('/grupos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Grupo.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.grupoRepository.usuarios(id).delete(where);
  }
}
