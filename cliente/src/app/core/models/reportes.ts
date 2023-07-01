export interface IReporte {
    // id: number;
    pais: string;
    cantidad: number;
    acronimo: string;
}

export interface ModelReporte {
    status: boolean;
    message: string;
    body: IReporte[];
}