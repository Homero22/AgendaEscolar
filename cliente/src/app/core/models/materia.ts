export interface ShowMateriaModel {
    status: boolean;
    message: string;
    body: MateriaModel[];

}

export interface MateriaModel {
    id: number;
    nombre: string;
    MateriaAcro: string;
    materiaColor: string;
    profesorNombre: string;
}

// export interface MateriaModel {
//     status: boolean;
//     message: string;
//     body: MateriaData;
// }

export interface MateriaData {
  id: number;
  nombre: string;
  materiaAcro: string;
  materiaColor: string;
  profesorNombre: string;
}

// --------------------- Agregar Materia ---------------------

export interface addMateriaModel{
  status: boolean;
  message: string;
  body: addMateriaData;
}

export interface addMateriaData{
  nombre: string;
  materiaAcro: string;
  materiaColor: string;
  profesorNombre: string;
}
