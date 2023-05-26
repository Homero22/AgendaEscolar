import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { conferenciasModel, dataConferencias } from './models/conferencias';

@Injectable({
  providedIn: 'root'
})
export class ConferenciasService {

  private url = 'https://26.241.69.100:4000/conferencias';



  constructor(private http: HttpClient) { }

  postConferencias(conferencias: dataConferencias) {
    console.log("data en el servicio",conferencias);
    return this.http.post<conferenciasModel>(`${this.url}`, conferencias);
  }
}
