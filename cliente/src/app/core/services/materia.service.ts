import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { ShowMateriaModel, MateriaData, MateriaModel, addMateriaData } from '../models/materia';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
private urlApi_Materias: string = config.URL_API_BASE + "subjects";



datosMateria!: MateriaModel[];

constructor(private http: HttpClient) { }

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
  return this.http.get<MateriaModel>(`${this.urlApi_Materias}/${id}`,
    {
      withCredentials: true
    });
}

putMateria(id: number, dataMateria: MateriaData){
  return this.http.put<MateriaData>(`${this.urlApi_Materias}/${id}`, dataMateria,
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
