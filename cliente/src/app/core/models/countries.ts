export interface ShowCountriesModel{
    body: CountryModel[];
}

export interface CountryModel{
    id: number;
    nombre: string;
    acronimo: string;
    estado: string;
}
