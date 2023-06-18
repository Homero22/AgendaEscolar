import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { ShowMateriaModel, addMateriaData, MateriaModel, modMateriaModel, addMAteriaDataByID } from '../models/materia';
import { BehaviorSubject, Observable } from 'rxjs';

const idMateria: number = 0;
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
private urlApi_Materias: string = config.URL_API_BASE + "subjects";

private urlApi_MateriasUsuario: string = config.URL_API_BASE + "subjects/user";



datosMateria!: MateriaModel[];

constructor(private http: HttpClient) { }

// ------------------------ MATERIAS BEHAVIORSUBJECTS ------------------------

//behaviorSubject para obtener el idDeMateria
private idMateria$ = new BehaviorSubject<number>(idMateria);

get selectIdMateria$(): Observable<number>{
  return this.idMateria$.asObservable();
}

setIdMateria(_idMateria: number){
  this.idMateria$.next(_idMateria);
}


// ------------------------ MATERIAS ------------------------


getMateriasUsuario(idUser: number){
  return this.http.get<ShowMateriaModel>(`${this.urlApi_MateriasUsuario}/${idUser}`,
    {
      withCredentials: true
    });
}

getMaterias(){
  return this.http.get<ShowMateriaModel>(`${this.urlApi_Materias}`,
    {
      withCredentials: true
    });
}

postMateria(dataMateria: addMateriaData){
  return this.http.post<ShowMateriaModel>(`${this.urlApi_Materias}`, dataMateria,
    {
      withCredentials: true
    });
}

getMateria(id: number){
  return this.http.get<modMateriaModel>(`${this.urlApi_Materias}/${id}`,
    {
      withCredentials: true
    });
}

putMateria(id: number, dataMateria: addMAteriaDataByID){
  return this.http.put<modMateriaModel>(`${this.urlApi_Materias}/${id}`, dataMateria,
    {
      withCredentials: true
    });
}

deleteMateria(id: number){
  return this.http.delete<MateriaModel>(`${this.urlApi_Materias}/${id}`,
    {
      withCredentials: true
    });
}





}
