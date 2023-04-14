export interface conferenciasModel{
    status: boolean;
    message: string;
    body:  dataConferencias[];
}

export interface dataConferencias{
    titulo: string;
    area: string;
    dia: number;
    costo: number;
    expositor: string;
    hora_inicio: string;
    hora_fin: string;
    fecha: string;
}