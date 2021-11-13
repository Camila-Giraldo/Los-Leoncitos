import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grupo,
  Docente,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoDocenteController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/docente', {
    responses: {
      '200': {
        description: 'Docente belonging to Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Docente)},
          },
        },
      },
    },
  })
  async getDocente(
    @param.path.number('id') id: typeof Grupo.prototype.id,
  ): Promise<Docente> {
    return this.grupoRepository.docente(id);
  }
}
