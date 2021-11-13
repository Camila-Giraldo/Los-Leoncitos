import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { ProgramaAcademico } from './programa-academico.model';
import { Grupo } from './grupo.model';

@model({
  settings: {
    foreignKeys: {
      fk_asignatura_programaAcademicoId: {
        name: 'fk_asignatura_programaAcademicoId',
        entity: 'ProgramaAcademico',
        entityKey: 'id',
        foreignKey: 'programaAcademicoId',
      }
    },
  },
})
export class Asignatura extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @property({
    type: 'string',
    required: true,
  })
  profundizacion: string;

  @belongsTo(() => ProgramaAcademico)
  programaAcademicoId: number;

  @hasMany(() => Grupo)
  grupos: Grupo[];

  constructor(data?: Partial<Asignatura>) {
    super(data);
  }
}

export interface AsignaturaRelations {
  // describe navigational properties here
}

export type AsignaturaWithRelations = Asignatura & AsignaturaRelations;
