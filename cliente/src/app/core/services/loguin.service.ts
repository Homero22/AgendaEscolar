import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { Observable } from 'rxjs';

import { LoguinModel , modelRecover, ShowLoguinModel} from '../models/loguin'

@Injectable({
  providedIn: 'root'
})
export class LoguinService {

  private urlApi_login: string = config.URL_API_BASE + 'login';
  private urlApi_recover: string = config.URL_API_BASE + 'recover';

  ShowLoguinModel!: ShowLoguinModel;

  constructor( private http: HttpClient ) {
  }

  postlogin ( loguin: LoguinModel ) {
    return this.http.post<ShowLoguinModel>( this.urlApi_login, loguin,{
      withCredentials: true,
    } );
  }

  postrecover(email: String){
    return this.http.post<modelRecover>(this.urlApi_recover, email, {
      withCredentials: true,
    });
  }
}


//
