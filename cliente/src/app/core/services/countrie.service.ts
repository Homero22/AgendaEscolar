import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { CountryModel, ShowCountriesModel } from '../models/countries';

@Injectable({
  providedIn: 'root'
})
export class CountrieService {

  datosCountry!:CountryModel[];

  //Rutas de los servicios
  private urlApi_countries: string = config.URL_API_BASE + "countries";

  constructor(
    private http: HttpClient
  ) { }


  getCountries(){
    return this.http.get<ShowCountriesModel>(this.urlApi_countries,
      {
        withCredentials: true
      });
  }

  getCountryById(id: number){
    return this.http.get<CountryModel>(`${this.urlApi_countries}/${id}`,
      {
        withCredentials: true
      });
  }
}
