import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SiaedufreeDataSource} from '../datasources';
import {GrupoEstudiante, GrupoEstudianteRelations} from '../models';

export class GrupoEstudianteRepository extends DefaultCrudRepository<
  GrupoEstudiante,
  typeof GrupoEstudiante.prototype.id,
  GrupoEstudianteRelations
> {
  constructor(
    @inject('datasources.siaedufree') dataSource: SiaedufreeDataSource,
  ) {
    super(GrupoEstudiante, dataSource);
  }
}
