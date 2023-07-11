//Mostrar Usuarios
export interface ShowUsuarioModel{
  status: boolean;
  message: string;
  body: UsuarioModel[];
}

export interface UsuarioModel{
  id: number;
  nombre: string;
  apellido: string;
  rol:string;
  telefono: string;
  correo: string;
  contrasena: string;
  paisId: number;
  nivelEstudio: string;
  fechaCreacion: string;
  estado: string;
}

//Modificar usuario
export interface updateUsuarioModel{
  status: boolean;
  message: string;
  body: updateUsuarioData;
}

export interface updateUsuarioData{
  id: number;
  nombre: string;
  apellido: string;
  rol:string;
  telefono: string;
  correo: string;
  contrasena: string;
  paisId: number;
  nivelEstudio: string;
  fechaCreacion: string;
  estado: string;
}



//Crear Usuario

export interface addUsuarioModel{
  status: boolean;
  message: string;
  body: addUsuarioData;
}
export interface addUsuarioData{
  nombre: string;
  apellido: string;
  rol:string;
  telefono: string;
  correo: string;
  contrasena: string;
  paisId: number;
  nivelEstudio: string;
  fechaCreacion: string;
  estado: string;
}
