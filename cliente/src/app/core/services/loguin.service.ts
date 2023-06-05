import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { Loguin } from '../models/loguin'

@Injectable({
  providedIn: 'root'
})
export class LoguinService {

  private urlApi_login: string = config.URL_API + 'login';

  constructor( private http: HttpClient ) {
  }

  postlogin ( loguin: Loguin ) {
    return this.http.post( this.urlApi_login, loguin );
  }
}


//