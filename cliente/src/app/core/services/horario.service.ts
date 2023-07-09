import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { Horario, addDataHorario, ModelAddHorario,HorarioItem, HomeroItem,ModelShowHorario } from '../models/horario';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private urlApi_Horario: string = config.URL_API_BASE + "schedules";
  constructor(private http: HttpClient) { 
    this.token = this.getCookie('token');

  }
  getCookie(name: string): string {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || '' : '';
  }
  token: any;

  // ------------------------ HORARIO BEHAVIORSUBJECTS ------------------------

  //behaviorSubject para obtener la hora y el dia
  private hora$ = new BehaviorSubject<string>('');
  private dia$ = new BehaviorSubject<string>('');
  private idHorario$ = new BehaviorSubject<number>(0);

  get selectHora$(): Observable<string>{
    return this.hora$.asObservable();
  }

  get selectDia$(): Observable<string>{
    return this.dia$.asObservable();
  }

  get selectIdHorario$(): Observable<number>{
    return this.idHorario$.asObservable();
  }

  setHora(_hora: string){
    this.hora$.next(_hora);
  }

  setDia(_dia: string){
    this.dia$.next(_dia);
  }

  setIdHorario(_idHorario: number){
    this.idHorario$.next(_idHorario);
  }

  // ------------------------ HORARIO ------------------------

  horas: string[] = ["7:00",'8:00', '9:00', '10:00', '11:00', '12:00','13:00',"14:00","15:00"]; // Horas del horario
  dias: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']; // Días del horario
  horario!: Horario 

    dataHorario!: HomeroItem[];
    // dataorario!: Horario;
    // ------------------------ CRUD ------------------------


    //Obtener horario por id
    getHorario(id: number){
      return this.http.get<ModelShowHorario>(`${this.urlApi_Horario}/${id}`,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
    }

    //Obtener horario por id de usuario
    getHorarioUser(id: number){
      console.log("id user en servicio =>", id);
      return this.http.get<ModelShowHorario>(`${this.urlApi_Horario}/${id}`,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
    }

    //Eliminar horario por id
    deleteHorario(id: number){
      return this.http.delete<ModelShowHorario>(`${this.urlApi_Horario}/${id}`,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
    }

    //Agregar horario
    postHorario(dataHorario: addDataHorario){
      return this.http.post<ModelAddHorario>(`${this.urlApi_Horario}`, dataHorario,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
    }   


    //Editar horario por id
    putHorario(id: number, dataHorario: addDataHorario){
      return this.http.put<ModelAddHorario>(`${this.urlApi_Horario}/${id}`, dataHorario,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
    }



    
}
