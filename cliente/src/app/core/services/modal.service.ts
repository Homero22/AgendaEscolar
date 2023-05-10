import {AfterContentInit, ElementRef, Injectable, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalService implements AfterContentInit {

  constructor() {}

  ngAfterContentInit(): void {
    throw new Error('Method not implemented.');
  }


    private cerrarForm$ = new BehaviorSubject<boolean>(false);

    get selectMessage$(): Observable<any> {
      return this.cerrarForm$.asObservable();
    }

    setMessageCerrar(message: any) {
      this.cerrarForm$.next(message);
    }

  }

