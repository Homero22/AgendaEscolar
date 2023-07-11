import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  constructor(private http: HttpClient) { 
    this.token = this.getCookie('token');

  }
  getCookie(name: string): string {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || '' : '';
  }
  token: any;

  //Rutas para consumir imagenes del Backend

  private urlApi_images: string = config.URL_API_BASE + "uploads"


  //Metodos para consumir imagenes del Backend

  //Metodo para obtener imagenes

  getImg(){
    return this.http.get<any>(this.urlApi_images,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }

  //Metodo para enviar la iamgen al backend
  postImg(image: any){
    return this.http.post<any>(this.urlApi_images, image,
      {
        withCredentials: true,
        params: {
          token: this.token
        }
      });
  }

  //Metodo para eliminar imagenes
  deleteImg(){}
}
