import {AfterContentInit, ElementRef, Injectable, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

const idMateria: number = 0;


@Injectable({
  providedIn: 'root'
})

export class ModalService implements AfterContentInit {

  constructor() {}

  ngAfterContentInit(): void {
    console.log("Error generado de ngAfterContentInit")
    throw new Error('Method not implemented.');
  }

    //BehaviorSubject para obtener el id en Materias
    private idMateria$ = new BehaviorSubject<number>(idMateria);

    get selectIdMateria$(): Observable<number>{
      return this.idMateria$.asObservable();
    }

    setIdMateria(_idMateria: number){
      this.idMateria$.next(_idMateria);
    }


    //Funciones Para Modal de Materias

    //Funcion Abrir Modal

    openModal(){

    }




  }

