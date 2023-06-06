import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { Loguin , modelRecover} from '../models/loguin'

@Injectable({
  providedIn: 'root'
})
export class LoguinService {

  private urlApi_login: string = config.URL_API_BASE + 'login';
  private urlApi_recover: string = config.URL_API_BASE + 'recover';

  constructor( private http: HttpClient ) {
  }

  postlogin ( loguin: Loguin ) {
    return this.http.post( this.urlApi_login, loguin,{
      withCredentials: true,
    } );
  }

  //funcion para recuperar contraseña

  postrecover(email: String){
    return this.http.post<modelRecover>(this.urlApi_recover, email, {
      withCredentials: true,
    });
  }
}


//
