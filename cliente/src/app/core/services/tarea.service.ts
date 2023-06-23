import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private urlApi_Tareas: string = config.URL_API_BASE + "homeworks";
  private urlApi_TareasUsuario: string = config.URL_API_BASE + "homeworks/user";
  private urlApi_TareasEstado: string = config.URL_API_BASE + "homeworks/estado";
  private urlApi_recordatorio: string =  "http://172.25.220.80:3001/lead";

  constructor(private http: HttpClient) { }

  // ------------------------ TAREAS BEHAVIORSUBJECTS ------------------------
  //behaviorSubject para obtener el idDeTarea
  private idTarea$ = new BehaviorSubject<number>(0);

  get selectIdTarea$(): Observable<number>{
    return this.idTarea$.asObservable();
  }

  setIdTarea(_idTarea: number){
    this.idTarea$.next(_idTarea);
  }


  // ------------------------ TAREAS ------------------------
  tareasPendientes: any = [];
  tareasRealizadas: any = [];
  tareas: any = [];

  getTareasUsuario(idUser: number){
    console.log("idUser en gerTareasUsuario =>",idUser);
    return this.http.get<any>(`${this.urlApi_TareasUsuario}/${idUser}`,
      {
        withCredentials: true
      });
  }

  postTarea(dataTarea: any){
    return this.http.post<any>(`${this.urlApi_Tareas}`, dataTarea,
      {
        withCredentials: true
      });
  }

  putTarea(idTarea: number, dataTarea: any){
    return this.http.put<any>(`${this.urlApi_Tareas}/${idTarea}`, dataTarea,
      {
        withCredentials: true
      });
  }

  deleteTarea(idTarea: number){
    return this.http.delete<any>(`${this.urlApi_Tareas}/${idTarea}`,
      {
        withCredentials: true
      });
  }

  getTareasEstado(idUser: number, estado: number){
    const params = new HttpParams()
    .set('estado', estado);
    //http://26.241.69.100:8002/homeworks/estado/4?estado=0
    return this.http.get<any>(`${this.urlApi_TareasEstado}/${idUser}`+'?'+params,
      {
        withCredentials: true
      });
  }

  getTareaId(idTarea: number){
    return this.http.get<any>(`${this.urlApi_Tareas}/${idTarea}`,
      {
        withCredentials: true
      });
  }

  // ------------------------ RECORDATORIOS ------------------------
  getRecordatorios(){
    return this.http.get<any>(`${this.urlApi_recordatorio}`,
      {
        withCredentials: true
      });
  }

  postRecordatorio(dataRecordatorio: any){
    console.log("dataRecordatorio =>", dataRecordatorio);
    return this.http.post<any>(`${this.urlApi_recordatorio}`, dataRecordatorio,
      {
        withCredentials: true
      });
  }

}
