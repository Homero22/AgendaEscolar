import { Injectable } from '@angular/core';
import config from 'config/config';
import { addApunteData, addApunteModel } from '../models/apunte';
import { HttpClient } from '@angular/common/http';
import { gptInfo, gptShowModel, promptModel } from '../models/gpt';

@Injectable({
  providedIn: 'root'
})
export class GptService {

  private urlApi_GPT: string = config.URL_API_BASE + "gpt";




  constructor(
    private http: HttpClient
  ) { }

  // Método para enviar info de la nota y obtener el prompt

  postPrompt(id: any, dataApunte: addApunteData){
    return this.http.post<any>(`${this.urlApi_GPT}/${id}`, dataApunte,
    {
      withCredentials: true
    })
  }

  postMessage(mensaje: promptModel){
    return this.http.post<any>(`${this.urlApi_GPT}`, mensaje,
    {
      withCredentials: true
    })
  }

  }
