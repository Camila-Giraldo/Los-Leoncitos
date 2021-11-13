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
  Docente,
  Grupo,
} from '../models';
import {DocenteRepository} from '../repositories';

export class DocenteGrupoController {
  constructor(
    @repository(DocenteRepository) protected docenteRepository: DocenteRepository,
  ) { }

  @get('/docentes/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Docente has many Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.docenteRepository.grupos(id).find(filter);
  }

  @post('/docentes/{id}/grupos', {
    responses: {
      '200': {
        description: 'Docente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Docente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInDocente',
            exclude: ['id'],
            optional: ['docenteId']
          }),
        },
      },
    }) grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.docenteRepository.grupos(id).create(grupo);
  }

  @patch('/docentes/{id}/grupos', {
    responses: {
      '200': {
        description: 'Docente.Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Partial<Grupo>,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.docenteRepository.grupos(id).patch(grupo, where);
  }

  @del('/docentes/{id}/grupos', {
    responses: {
      '200': {
        description: 'Docente.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.docenteRepository.grupos(id).delete(where);
  }
}
