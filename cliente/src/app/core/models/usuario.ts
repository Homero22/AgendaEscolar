//Mostrar Usuarios
export interface ShowUsuarioModel{
  status: number;
  message: string;
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

//Crear Usuario

export interface addUsuarioModel{
  status: number;
  message: string;
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
