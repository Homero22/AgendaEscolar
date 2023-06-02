import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {

  //Creamos el public destroy$
  private destroy$ = new Subject<any>();

  //Creamos el formulario de Registro
  registerForm!: FormGroup;
  //Variable para que el usuario pueda ver la contraseña
  hide = true;
  //Variable para el email
  email!: FormControl;



  constructor(
    public formBuilder: FormBuilder
  ){

    //Validaciones del email
    this.email = new FormControl('', [Validators.required, Validators.email]);

    //Validaciones del formulario

    this.registerForm = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required]
      ],
      apellido: [
        '',
        [Validators.required]
      ],
      email: this.email,
      password: [
        '',
        [Validators.required]
      ],
      telefono: [
        '',
        [
          Validators.required, Validators.pattern(/^[0-9]{10}$/)]
      ],
      pais: [
        '',
        [Validators.required]
      ],
      nivelEstudio: [
        '',
        [Validators.required]
      ],
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
