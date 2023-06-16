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

    //behaviorSubject para obtener el title del modal
    private titleModal$ = new BehaviorSubject<string>('');

    get selectTitleModal$(): Observable<string>{
      return this.titleModal$.asObservable();
    }

    setTitleModal(_titleModal: string){
      this.titleModal$.next(_titleModal);
      //imprimimos el valor del title
      console.log("Valor del title",_titleModal);
    }


  }

