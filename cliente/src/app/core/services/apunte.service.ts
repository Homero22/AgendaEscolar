import { Injectable } from '@angular/core';
import config from 'config/config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShowApunteData, ShowApunteModel, addApunteByID, addApunteData, addApunteModel, modApunteModel } from '../models/apunte';

const idApunte: number = 0;

@Injectable({
  providedIn: 'root'
})
export class ApunteService {

  private urlApi_Apuntes: string = config.URL_API_BASE + "notes";

  private urlApi_ApuntesUsuario: string = config.URL_API_BASE + "notes/user";

  datosApuntes: any = [];

  constructor(
    private http: HttpClient
  ) { }


  // ------------------------ APUNTES BEHAVIORSUBJECTS ------------------------
  private idApunte$ = new BehaviorSubject<number>(idApunte);

  get selectIdApunte$(): Observable<number>{
    return this.idApunte$.asObservable();
  }

  setIdApunte(_idApunte: number){
    this.idApunte$.next(_idApunte);
  }

  // ------------------------ APUNTES BEHAVIORSUBJECTS ------------------------

  // Metodo para obtener los apuntes del usuario logueado
  getApuntesUsuario(idUser: number){
    return this.http.get<ShowApunteModel>(`${this.urlApi_ApuntesUsuario}/${idUser}`,
    {
      withCredentials: true
    });
  }

  getApunteIndividual(id: number){
    return this.http.get<addApunteModel>(`${this.urlApi_Apuntes}/${id}`,
    {
      withCredentials: true
    });
  }

  // Método para agregar apunte
  postApunte(dataApunte: addApunteData){
    return this.http.post<ShowApunteModel>(`${this.urlApi_Apuntes}`, dataApunte,
    {
      withCredentials: true
    })
  }

  // Metodo para editar un apunte
  putapunte(id: number, dataApunte: addApunteByID){
    return this.http.put<modApunteModel>(`${this.urlApi_Apuntes}/${id}`,
    {
      withCredentials: true
    })
  }

  // Metodo para eliminar un apunte
  deleteApunte(id: number){
    return this.http.delete<ShowApunteModel>(`${this.urlApi_Apuntes}/${id}`,
    {
      withCredentials: true
    })
  }
}
