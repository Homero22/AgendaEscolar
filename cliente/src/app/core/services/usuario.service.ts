import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import config from 'config/config';
import { ShowUsuarioModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Rutas de los servicios
  private urlApi_Usuarios: string = config.URL_API_BASE + "/users";

  //Constructor
  constructor(private http: HttpClient) { }

  //Metodos de los Servicios

  //listar Usuarios
  getUsuarios(){
    return this.http.get<ShowUsuarioModel>(this.urlApi_Usuarios);
  }

  //crear - registrar Usuario

  //modificar - actualizar Usuario

  //eliminar Usuario
}
