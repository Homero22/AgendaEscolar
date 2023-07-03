import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private urlApi_Administrador: string = config.URL_API_BASE + "users/administradores";
  private urlApi_Usuarios: string = config.URL_API_BASE + "users";

  constructor(private http: HttpClient) { }

  // ------------------------ ADMINISTRADOR ------------------------

  // Obtener todos los administradores
  getAdministradores(){
    return this.http.get<any>(`${this.urlApi_Administrador}`,
      {
        withCredentials: true
      });
  }

  // Obtener un administrador por su id
  getAdministrador(id: number){
    return this.http.get<any>(`${this.urlApi_Administrador}/${id}`,
      {
        withCredentials: true
      });
  }

  // Crear un administrador
  postAdministrador(dataAdministrador: any){
    return this.http.post<any>(`${this.urlApi_Usuarios}`, dataAdministrador,
      {
        withCredentials: true
      });
  }

  // Modificar un administrador
  putAdministrador(id: number, dataAdministrador: any){
    return this.http.put<any>(`${this.urlApi_Usuarios}/${id}`, dataAdministrador,
      {
        withCredentials: true
      });
  }

  // Eliminar un administrador
  deleteAdministrador(id: number){
    return this.http.delete<any>(`${this.urlApi_Usuarios}/${id}`,
      {
        withCredentials: true
      });
  }
}
