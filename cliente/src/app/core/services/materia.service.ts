import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { ShowMateriaModel, addMateriaData, MateriaModel, modMateriaModel, addMAteriaDataByID, modMateriaData } from '../models/materia';
import { BehaviorSubject, Observable } from 'rxjs';

const idMateria: number = 0;
const statusBool: boolean = false;
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
private urlApi_Materias: string = config.URL_API_BASE + "subjects";

private urlApi_MateriasUsuario: string = config.URL_API_BASE + "subjects/user";



datosMateria!: MateriaModel[];

// Materia contenido
materia: modMateriaData = {
  id: 0,
  idUser: 0,
  nombre: '',
  materiaAcro: '',
  materiaColor: '',
  profesorNombre: ''
};

constructor(private http: HttpClient) { 
  this.token = this.getCookie('token');

}
getCookie(name: string): string {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() || '' : '';
}
token: any;
// ------------------------ MATERIAS BEHAVIORSUBJECTS ------------------------

//behaviorSubject para obtener el idDeMateria
private idMateria$ = new BehaviorSubject<number>(idMateria);

get selectIdMateria$(): Observable<number>{
  return this.idMateria$.asObservable();
}

setIdMateria(_idMateria: number){
  this.idMateria$.next(_idMateria);
}


//behaviorSubject para obtener un valor false
private getBool$ = new BehaviorSubject<boolean>(statusBool);

get selectBool$(): Observable<boolean>{
  return this.getBool$.asObservable();
}

setBool(_bool: boolean){
  this.getBool$.next(_bool);
}

// ------------------------ MATERIAS ------------------------


getMateriasUsuario(idUser: number){
  console.log("idUser en gerMateriasUsuario =>",idUser);
  return this.http.get<ShowMateriaModel>(`${this.urlApi_MateriasUsuario}/${idUser}`,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
}

getMaterias(){
  return this.http.get<ShowMateriaModel>(`${this.urlApi_Materias}`,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
}

postMateria(dataMateria: addMateriaData){
  return this.http.post<ShowMateriaModel>(`${this.urlApi_Materias}`, dataMateria,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
}

getMateria(id: number){
  return this.http.get<modMateriaModel>(`${this.urlApi_Materias}/${id}`,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
}

putMateria(id: number, dataMateria: addMAteriaDataByID){
  return this.http.put<modMateriaModel>(`${this.urlApi_Materias}/${id}`, dataMateria,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
}

deleteMateria(id: number){
  return this.http.delete<ShowMateriaModel>(`${this.urlApi_Materias}/${id}`,
    {
      withCredentials: true,
      params: {
        token: this.token
      }
    });
}





}
