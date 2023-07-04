import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { bodyGraph } from '../models/inicio'

@Injectable({
  providedIn: 'root'
})
export class InicioAdminService {

  private urlApi_userTotal: string = config.URL_API_BASE + "users/total"
  private urlApi_materiasTotal: string = config.URL_API_BASE + "subjects/total"
  private urlApi_anios: string = config.URL_API_BASE + "anios"
  private urlApi_adminT: string = config.URL_API_BASE + "users/total/admins"
  private urlApi_userxmes: string = config.URL_API_BASE + "users/anio"

  constructor(private http: HttpClient) { }

  usuariosT!: number;
  materiasT!: number;
  adminsT: number = 0;
  anios!: number;
  datos!: bodyGraph[];

  //-----------Para obtener los valores de los cards------------


  getUsersTotal(){
    return this.http.get<any>(`${this.urlApi_userTotal}`,
    {
      withCredentials: true
    }
    )
  }

  getMateriasTotales(){
    return this.http.get<any>(`${this.urlApi_materiasTotal}`,
    {
      withCredentials: true
    }
    )
  }

  getAdminTotales(){
    return this.http.get<any>(`${this.urlApi_adminT}`,
    {
      withCredentials: true
    })  
  }

  //------------------para el gráfico user-tiempo--------------------

  getAniosDisponible(){
    return this.http.get<any>(`${this.urlApi_anios}`,
    {
      withCredentials: true
    })
  }

  getUserXMes(anio: number){
    return this.http.get<any>(`${this.urlApi_userxmes}/${anio}`,
    {
      withCredentials: true
    })
  }


}
