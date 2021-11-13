import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_grupoEstudiante_grupoId: {
        name: 'fk_grupoEstudiante_grupoId',
        entity: 'Grupo',
        entityKey: 'id',
        foreignKey: 'grupoId',
      },
      fk_grupoEstudiante_estudianteId: {
        name: 'fk_grupoEstudiante_estudianteId',
        entity: 'Estudiante',
        entityKey: 'id',
        foreignKey: 'estudianteId',
      }
    },
  },
})
export class GrupoEstudiante extends Entity {
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
  correo: string;

  @property({
    type: 'number',
  })
  grupoId?: number;

  @property({
    type: 'number',
  })
  estudianteId?: number;

  constructor(data?: Partial<GrupoEstudiante>) {
    super(data);
  }
}

export interface GrupoEstudianteRelations {
  // describe navigational properties here
}

export type GrupoEstudianteWithRelations = GrupoEstudiante & GrupoEstudianteRelations;
