import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { IReporte, ModelReporte } from '../models/reportes';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private urlApi_Reportes: string = config.URL_API_BASE + "reportes/usuariosPais";

  constructor( private http: HttpClient ) { }

  datos! : IReporte[] 
    


  getUsuariosPais(){
    return this.http.get<ModelReporte>(`${this.urlApi_Reportes}`,{
      withCredentials: true
    })
  }
}
