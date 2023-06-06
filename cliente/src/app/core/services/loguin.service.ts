import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { LoguinModel, ShowLoguinModel } from '../models/loguin'

@Injectable({
  providedIn: 'root'
})
export class LoguinService {

  private urlApi_login: string = config.URL_API_BASE + 'login';

  constructor( private http: HttpClient ) {
  }

  postlogin ( loguinData: LoguinModel ) {
    return this.http.post<ShowLoguinModel>(this.urlApi_login, loguinData,{
      withCredentials: true,
    } );
  }
}


//
