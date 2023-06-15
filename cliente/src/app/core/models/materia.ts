export interface ShowMateriaModel {
    status: boolean;
    message: string;
    body: MateriaModel[];

}

export interface MateriaModel {
    id: number;
    nombre: string;
}

export interface MateriaModel {
    status: boolean;
    message: string;
    body: MateriaData;
}

export interface MateriaData {
    nombre: string;
}


