import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  constructor(
    private http: HttpClient
  ) { }

  //Rutas para consumir imagenes del Backend

  private urlApi_images: string = config.URL_API_BASE + "uploads"


  //Metodos para consumir imagenes del Backend

  //Metodo para obtener imagenes

  getImg(){}

  //Metodo para enviar la iamgen al backend
  postImg(image: any){
    return this.http.post<any>(this.urlApi_images, image,
      {
        withCredentials: true
      });
  }

  //Metodo para eliminar imagenes
  deleteImg(){}
}
