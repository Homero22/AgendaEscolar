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

  constructor(private http: HttpClient) { 
    this.token = this.getCookie('token');

  }
  getCookie(name: string): string {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || '' : '';
  }
  token: any;


  getCountries(){
    return this.http.get<ShowCountriesModel>(this.urlApi_countries,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }

  getCountryById(id: number){
    return this.http.get<CountryModel>(`${this.urlApi_countries}/${id}`,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }
}
