export interface ShowLoguinModel {
  status: boolean;
  message: string;
  body: LoguinData[];
  token: string;
}

export interface LoguinData{
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
export interface LoguinModel {
    email: string;
    password: string;
}

//tipado de datos para recuperar contraseña

export interface modelRecover{
    status: boolean;
    message: string;
    body: [];
}

export interface JQuery {
  carousel(): void;
}

