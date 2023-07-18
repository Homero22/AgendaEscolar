import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { contenidoShowData } from '../models/contenido';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  // contentSimilarData: contenidoShowData = {
  //   id: 0,
  //   idApunte: 0,
  //   idUser: 0,
  //   contenido: '',
  //   estado: '',
  //   puntuacion: 0,
  //   categoria: ''
  // }

  contentSimilarData: any[] = [];

  constructor(
    public http: HttpClient,
  ) {
    this.token = this.getCookie('token');
  }

  getCookie(name: string): string {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || '' : '';
  }
  token: any;

    // Ruta para contenido
    private urlApi_Contenido: string = config.URL_API_BASE + "contents";
    private urlApi_ContenidoSimilar: string = config.URL_API_BASE + "contents/similares";
    private urlApi_ContenidoGuardado: string = config.URL_API_BASE + "contents/guardados";

    // Funciones para Contenido

    // Obtener todos los contenidos
    getContent(idApunte: number){
      return this.http.get<any>(`${this.urlApi_Contenido}/${idApunte}`,
      {
        withCredentials: true,
        params:{
         token: this.token
        }
      });
    }

    postContenido(contenido: any){
      return this.http.post<any>(`${this.urlApi_Contenido}`, contenido,
      {
        withCredentials: true,
        params:{
         token: this.token
        }
      });
    }

    deleteContent(idContent: number){
      return this.http.delete<any>(`${this.urlApi_Contenido}/${idContent}`,
      {
        withCredentials: true,
        params:{
          token: this.token
        }
      });
    }


    putContent(idContent: number, contenido: any){
      return this.http.put<any>(`${this.urlApi_Contenido}/${idContent}`, contenido,
      {
        withCredentials: true,
        params:{
          token: this.token
        }
      });
    }

    // Metodo para obtener los contenidos similares

    getContenidosSimilares(idContent: number){
      return this.http.get<any>(`${this.urlApi_ContenidoSimilar}/${idContent}`,
      {
        withCredentials: true,
        params:{
          token: this.token
        }
      });
    }

    // Metodo para obtener los contenidos guardados
    getContenidosGuardados(idUser: number){
      return this.http.get<any>(`${this.urlApi_ContenidoGuardado}/${idUser}`,
      {
        withCredentials: true,
        params:{
          token: this.token
        }
      });
    }

    // Metodo para obtener un contenido guardado
    getContenidoGuardadoByID(idContent: number){
      return this.http.get<any>(`${this.urlApi_ContenidoGuardado}/${idContent}`,
      {
        withCredentials: true,
        params:{
          token: this.token
        }
      });
    }

    // Metodo para guardar un contenido
    postContenidoGuardado(idContent: number){
      return this.http.post<any>(`${this.urlApi_ContenidoGuardado}/${idContent}`, {
        withCredentials: true,
        params:{
          token: this.token
        }
      },)
    }

    // Metodo para eliminar un contenido guardado
    deleteContenidoGuardado(idContent: number){
      return this.http.delete<any>(`${this.urlApi_ContenidoGuardado}/${idContent}`,
      {
        withCredentials: true,
        params:{
          token: this.token
        }
      });
    }
}
