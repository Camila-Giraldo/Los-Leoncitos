import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SiaedufreeDataSource} from '../datasources';
import {Grupo, GrupoRelations, Asignatura, Docente, Estudiante, GrupoEstudiante} from '../models';
import {AsignaturaRepository} from './asignatura.repository';
import {DocenteRepository} from './docente.repository';
import {GrupoEstudianteRepository} from './grupo-estudiante.repository';
import {EstudianteRepository} from './estudiante.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly asignatura: BelongsToAccessor<Asignatura, typeof Grupo.prototype.id>;

  public readonly docente: BelongsToAccessor<Docente, typeof Grupo.prototype.id>;

  public readonly estudiantes: HasManyThroughRepositoryFactory<Estudiante, typeof Estudiante.prototype.id,
          GrupoEstudiante,
          typeof Grupo.prototype.id
        >;

  constructor(
    @inject('datasources.siaedufree') dataSource: SiaedufreeDataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>, @repository.getter('DocenteRepository') protected docenteRepositoryGetter: Getter<DocenteRepository>, @repository.getter('GrupoEstudianteRepository') protected grupoEstudianteRepositoryGetter: Getter<GrupoEstudianteRepository>, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Grupo, dataSource);
    this.estudiantes = this.createHasManyThroughRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter, grupoEstudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
    this.docente = this.createBelongsToAccessorFor('docente', docenteRepositoryGetter,);
    this.registerInclusionResolver('docente', this.docente.inclusionResolver);
    this.asignatura = this.createBelongsToAccessorFor('asignatura', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignatura', this.asignatura.inclusionResolver);
  }
}
