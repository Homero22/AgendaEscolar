import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { UsuarioModel} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private urlApi_Administrador: string = config.URL_API_BASE + "users/administradores";
  private urlApi_Usuarios: string = config.URL_API_BASE + "users";

  constructor(private http: HttpClient) { 
    this.token = this.getCookie('token');

  }
  getCookie(name: string): string {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || '' : '';
  }
  token: any;

  administradores!: UsuarioModel[];
  admin!: UsuarioModel;
  // ------------------------ ADMINISTRADOR ------------------------

  // Obtener todos los administradores
  getAdministradores(){
    return this.http.get<any>(`${this.urlApi_Administrador}`,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }

  // Obtener un administrador por su id
  getAdministrador(id: number){
    return this.http.get<any>(`${this.urlApi_Usuarios}/${id}`,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }

  // Crear un administrador
  postAdministrador(dataAdministrador: any){
    return this.http.post<any>(`${this.urlApi_Usuarios}`, dataAdministrador,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }

  // Modificar un administrador
  putAdministrador(id: number, dataAdministrador: any){
    return this.http.put<any>(`${this.urlApi_Usuarios}/${id}`, dataAdministrador,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }

  // Eliminar un administrador
  deleteAdministrador(id: number){
    return this.http.delete<any>(`${this.urlApi_Usuarios}/${id}`,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }
}
