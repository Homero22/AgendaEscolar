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

    // metodo para cerrar el modal
    private closeModal$ = new BehaviorSubject<boolean>(false);

    get selectCloseModal$(): Observable<boolean>{
      return this.closeModal$.asObservable();
    }

    setCloseModal(_closeModal: boolean){
      this.closeModal$.next(_closeModal);
    }

    //Metodo para cerrar el matDialog
    private closeMatDialog$ = new BehaviorSubject<boolean>(false);

    get selectCloseMatDialog$(): Observable<boolean>{
      return this.closeMatDialog$.asObservable();
    }

    setCloseMatDialog(_closeMatDialog: boolean){
      this.closeMatDialog$.next(_closeMatDialog);
    }

  }

