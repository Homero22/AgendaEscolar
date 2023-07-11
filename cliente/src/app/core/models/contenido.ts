export interface contenidoShowmodel{
  status: boolean;
  message: string;
  body: contenidoShowData;
}

export interface contenidoShowData{
  id: number;
  idApunte: number;
  idUser: number;
  contenido: string;
  estado: string;
  puntuacion: number;
  categoria: string;
}


// --------------------- Agregar Contenido ---------------------
export interface addContenidoModel{
  status: boolean;
  message: string;
  body: addContenidoData;
}

export interface addContenidoData{
  id: number;
  idApunte: number;
  idUser: number;
  contenido: string;
  estado: string;
  puntuacion: number;
  categoria: string;
}

// --------------------- Editar Contenido ---------------------
export interface modContenidoModel {
  status: boolean;
  message: string;
  body: modContenidoData;
}

export interface modContenidoData {
  id: number;
  idApunte: number;
  idUser: number;
  contenido: string;
  estado: string;
  puntuacion: number;
  categoria: string;
}
