import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  constructor(
    public http: HttpClient,
  ) { }

    // Ruta para contenido
    private urlApi_Contenido: string = config.URL_API_BASE + "contents";

    // Funciones para Contenido

    // Obtener todos los contenidos
    getContent(idContenido: number){
      return this.http.get<any>(`${this.urlApi_Contenido}/${idContenido}`,
      {
        withCredentials: true
      });
    }

    postContenido(contenido: any){
      return this.http.post<any>(`${this.urlApi_Contenido}`, contenido,
      {
        withCredentials: true
      });
    }




}
