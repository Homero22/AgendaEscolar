import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import config from 'config/config';
import { addUsuarioData, updateUsuarioData, updateUsuarioModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Contenido de usuario
  usuarioData: updateUsuarioData = {
    id: 0,
    nombre: "",
    apellido: "",
    rol:"",
    telefono: "",
    correo: "",
    contrasena: "",
    paisId: 0,
    nivelEstudio: "",
    fechaCreacion: "",
    estado: ""
  }



  //Rutas de los servicios
  private urlApi_Usuarios: string = config.URL_API_BASE + "users";

  //Constructor
  constructor(private http: HttpClient) { }

  //Metodos de los Servicios

  //listar Usuarios
  getUsuarios(){
    return this.http.get<any>(`${this.urlApi_Usuarios}`,
      {
        withCredentials: true
      });
  }

  //Obtener un usuario por ID

  getUserByID(idUser: number){
    return this.http.get<any>(`${this.urlApi_Usuarios}/${idUser}`,
      {
        withCredentials: true
      });
  }

  //crear - registrar Usuario
  postUser(dataUsuario: addUsuarioData){
    return this.http.post<any>(`${this.urlApi_Usuarios}`, dataUsuario,
      {
        withCredentials: true
      });
  }

  //modificar - actualizar Usuario
  putUser(id:number, dataUsuario: updateUsuarioData){
    return this.http.put<updateUsuarioModel>(`${this.urlApi_Usuarios}/${id}`, dataUsuario,
      {
        withCredentials: true
      });
  }



  //eliminar Usuario
}
