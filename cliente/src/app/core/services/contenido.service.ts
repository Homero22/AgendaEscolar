import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { contenidoShowData } from '../models/contenido';
import { BehaviorSubject, Observable } from 'rxjs';

const idContenido: number = 0;
const contenidoTitle: string = '';
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
    // contentData:  contenidoShowData = {
    //   id: 0,
    //   idApunte: 0,
    //   idUser: 0,
    //   contenido: '',
    //   estado: '',
    //   puntuacion: 0,
    //   categoria: '',
    // }

    contentData: any = {};


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
    private urlApi_ContenidoSave: string = config.URL_API_BASE + "contents/save";
    private urlApi_ContenidoDetalle: string = config.URL_API_BASE + "contents/content";


  //BehaviorSubject para el id del contenido
  private idContenido$ = new BehaviorSubject<number>(idContenido);

  get selectIdContenido$(): Observable<number>{
    return this.idContenido$.asObservable();
  }

  setIdContenido(_idContenido: number){
    this.idContenido$.next(_idContenido);
  }


  private getTitle$ = new BehaviorSubject<string>(contenidoTitle);

  get selectTitle$(): Observable<string>{
    return this.getTitle$.asObservable();
  }

  setTitle(_title: string){
    this.getTitle$.next(_title);
  }


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

    getContentByID(idContent: number){
      return this.http.get<any>(`${this.urlApi_Contenido}/${idContent}`,
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

    getContenidoSimilarByID(idContenido: number){
      return this.http.get<any>(`${this.urlApi_ContenidoSimilar}/${idContenido}`,
      {
        withCredentials: true,
        params:{
          token: this.token
        }
      });
    }






// Funciones para Contenido Guardado

    // Metodo para obtener los contenidos guardados
    getContenidosGuardados(idApunte: number){
      return this.http.get<any>(`${this.urlApi_ContenidoGuardado}/${idApunte}`,
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
    postContenidoGuardado( contenido: any){
      return this.http.post<any>(`${this.urlApi_ContenidoSave}`, contenido, {
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


    getContenidoDetalle(idContent: number){
      return this.http.get<any>(`${this.urlApi_ContenidoDetalle}/${idContent}`,
      {
        withCredentials: true,
        params:{
          token: this.token
        }
      });
    }

}
