import {AfterContentInit, ElementRef, Injectable, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

const detalles: {
  form: string;
  title: string;
} = {
  form: '',
  title: ''
};

@Injectable({
  providedIn: 'root'
})

export class ModalService implements AfterContentInit {

  constructor() {}

  ngAfterContentInit(): void {
    throw new Error('Method not implemented.');
  }

  openModal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;

    if(modalGeneral){
      console.log("Abriendo modal desde if ->", modalGeneral);

      modalGeneral.style.display = 'block';
      modalGeneral.classList.add('show');
      modalGeneral.style.backgroundColor = 'rgba(0,0,0,0.5)';
      setTimeout(()=> {
        if(modalGeneral){
          modalGeneral.style.opacity = 1;
        }
      })
    }
  }

  closemodal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;

    if(modalGeneral){
      console.log("Cerrando modal desde if ->", modalGeneral);

      modalGeneral.style.display = 'none';
      modalGeneral.classList.remove('show');
      modalGeneral.style.opacity = 1;}
    }
  }

