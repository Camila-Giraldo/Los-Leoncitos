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
GrupoEstudiante,
Estudiante,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoEstudianteController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Array of Grupo has many Estudiante through GrupoEstudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Estudiante>,
  ): Promise<Estudiante[]> {
    return this.grupoRepository.estudiantes(id).find(filter);
  }

  @post('/grupos/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'create a Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInGrupo',
            exclude: ['id'],
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'id'>,
  ): Promise<Estudiante> {
    return this.grupoRepository.estudiantes(id).create(estudiante);
  }

  @patch('/grupos/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Grupo.Estudiante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {partial: true}),
        },
      },
    })
    estudiante: Partial<Estudiante>,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.grupoRepository.estudiantes(id).patch(estudiante, where);
  }

  @del('/grupos/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Grupo.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.grupoRepository.estudiantes(id).delete(where);
  }
}
