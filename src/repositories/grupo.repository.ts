import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SiaEdufreeCycle4DataSource} from '../datasources';
import {Grupo, GrupoRelations, Asignatura, Usuario, UsuarioPorGrupo} from '../models';
import {AsignaturaRepository} from './asignatura.repository';
import {UsuarioPorGrupoRepository} from './usuario-por-grupo.repository';
import {UsuarioRepository} from './usuario.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly asignatura: BelongsToAccessor<Asignatura, typeof Grupo.prototype.id>;

  public readonly usuarios: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          UsuarioPorGrupo,
          typeof Grupo.prototype.id
        >;

  constructor(
    @inject('datasources.sia_edufree_cycle4') dataSource: SiaEdufreeCycle4DataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>, @repository.getter('UsuarioPorGrupoRepository') protected usuarioPorGrupoRepositoryGetter: Getter<UsuarioPorGrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Grupo, dataSource);
    this.usuarios = this.createHasManyThroughRepositoryFactoryFor('usuarios', usuarioRepositoryGetter, usuarioPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.asignatura = this.createBelongsToAccessorFor('asignatura', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignatura', this.asignatura.inclusionResolver);
  }
}
