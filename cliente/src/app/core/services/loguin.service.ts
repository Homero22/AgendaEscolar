import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { Loguin } from '../models/loguin'
import { Observable } from 'rxjs';


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

  // postlogin(loguin: Loguin): Observable<any> {
  //   // const loginRequest = { email, password };
  //   return this.http.post(this.urlApi_login, loguin);
  // }

  //funcion para recuperar contraseña

  postrecover(email: String){
    return this.http.post(this.urlApi_recover, email, {
      withCredentials: true,
    });
  }
}


//
