export interface ShowCountriesModel{
  status: boolean;
  message: string;
  body: CountryModel[];
}

export interface CountryModel{
    id: number;
    nombre: string;
    acronimo: string;
    estado: string;
}


