import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asignatura} from './asignatura.model';
import {Docente} from './docente.model';
import {Estudiante} from './estudiante.model';
import {GrupoEstudiante} from './grupo-estudiante.model';

@model({
  settings: {
    foreignKeys: {
      fk_grupo_asignaturaId: {
        name: 'fk_grupo_asignaturaId',
        entity: 'Asignatura',
        entityKey: 'id',
        foreignKey: 'asignaturaId',
      },
      fk_grupo_docenteId: {
        name: 'fk_grupo_docenteId',
        entity: 'Docente',
        entityKey: 'id',
        foreignKey: 'docenteId',
      }
    },
  },
})
export class Grupo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Asignatura)
  asignaturaId: number;

  @belongsTo(() => Docente)
  docenteId: number;

  @hasMany(() => Estudiante, {through: {model: () => GrupoEstudiante}})
  estudiantes: Estudiante[];

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
