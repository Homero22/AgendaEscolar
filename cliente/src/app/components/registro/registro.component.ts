import { Component } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  //Creamos el public destroy$
  private destroy$ = new Subject<any>();

  //Creamos el formulario
  registerForm!: FormGroup;


  constructor(
    public formBuilder: FormBuilder
  ){
    this.registerForm = this.formBuilder.group({

    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
