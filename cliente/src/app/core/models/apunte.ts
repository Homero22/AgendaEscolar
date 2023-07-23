export interface ShowApunteModel{
  status: boolean;
  message: string;
  body: ShowApunteData[];
}

export interface ShowApunteData{
  id: number;
  idUser: number;
  idUserContent: number;
  idMateria: number;
  apunteTitulo: string;
  apunteNotasClase: string;
  apunteIdeas: string;
  apunteResumen: string;
  apunteRecordatorio: string;
  fechaCreacion: string;
}


// --------------------- Agregar Apunte ---------------------

export interface addApunteModel{
  status: boolean;
  message: string;
  body: addApunteData;
}

export interface addApunteData{
  idUser: number;
  idUserContent: number;
  idMateria: number;
  apunteTitulo: string;
  apunteNotasClase: string;
  apunteIdeas: string;
  apunteResumen: string;
  apunteRecordatorio: string;
  fechaCreacion: string;
}

// --------------------- Editar Apunte ---------------------
export interface modApunteModel {
  status: boolean;
  message: string;
  body: modApunteData;
}

export interface modApunteData {
  id: number;
  idUserContent: number;
  idUser: number;
  idMateria: number;
  apunteTitulo: string;
  apunteNotasClase: string;
  apunteIdeas: string;
  apunteResumen: string;
  apunteRecordatorio: string;
  fechaCreacion: string;
}

export interface addApunteByID{
  id: number;
  idUser: number;
  idUserContent: number;
  idMateria: number;
  apunteTitulo: string;
  apunteNotasClase: string;
  apunteIdeas: string;
  apunteResumen: string;
  apunteRecordatorio: string;
  fechaCreacion: string;
}


