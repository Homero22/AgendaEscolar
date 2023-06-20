import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable } from 'rxjs';

import { LoguinData, LoguinModel , modelRecover, ShowLoguinModel} from '../models/loguin'

const idUser: number = 0;

@Injectable({
  providedIn: 'root'
})
export class LoguinService {

  private urlApi_login: string = config.URL_API_BASE + 'login';
  private urlApi_recover: string = config.URL_API_BASE + 'recover';

  ShowLoguinModel!: ShowLoguinModel;

  _loguinData!: LoguinData;


  // BehaviorSubject para agarrar el id del Usuario
  private idUser$ = new BehaviorSubject<number>(idUser);

  get selectIdUser$(): Observable<number>{
    console.log("idUser$ -> ", this.idUser$);
    return this.idUser$.asObservable();
  }

  setIdUser(_idUser: number){
    console.log("idUser -> ", _idUser);
    this.idUser$.next(_idUser);
  }



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
