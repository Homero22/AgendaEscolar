export interface Loguin {
    email: string;
    password: string;
}

//tipado de datos para recuperar contraseña

export interface modelRecover{
    status: boolean;
    message: string;
    body: [];
}