import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SiaedufreeDataSource} from '../datasources';
import {Estudiante, EstudianteRelations} from '../models';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.id,
  EstudianteRelations
> {
  constructor(
    @inject('datasources.siaedufree') dataSource: SiaedufreeDataSource,
  ) {
    super(Estudiante, dataSource);
  }
}
