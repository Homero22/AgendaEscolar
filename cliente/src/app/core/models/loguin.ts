export interface ShowLoguinModel {
  status: boolean;
  message: string;
  body: LoguinModel;
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
