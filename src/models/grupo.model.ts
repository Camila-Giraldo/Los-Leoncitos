import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asignatura} from './asignatura.model';
import {Usuario} from './usuario.model';
import {UsuarioPorGrupo} from './usuario-por-grupo.model';

@model()
export class Grupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'boolean',
    required: true,
  })
  disponible: string;

  @property({
    type: 'number',
    required: true,
  })
  cupos: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  horarios: string[];

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;

  @belongsTo(() => Asignatura)
  asignaturaId: string;

  @hasMany(() => Usuario, {through: {model: () => UsuarioPorGrupo}})
  usuarios: Usuario[];

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
