import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [
    './register-page.component.css',
  ]
})
export class RegisterPageComponent {
  //Validacion de email
  email!: FormControl;

  //Validacion de password
  hide = true;

  //declaracion del destroy$
  destroy$ = new Subject<any>();


  //Creacion del formulario para registro
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {

    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.registerForm = this.formBuilder.group({
      nombre:
        [
          '',
          [ Validators.required]
        ],
      apellido:
        [
          '',
          [ Validators.required]
        ],
        email: this.email,
        password:
        [
          '',
          [ Validators.required]
        ],
        telefono:
        [
          '',
          [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]
        ],
        pais:
        [
          '',
          [ Validators.required]
        ],
        estudio:
        [
          '',
          [ Validators.required]
        ],
    });
  }

  //Metodo ngOnInit
  ngOnInit(): void {}

  //Metodo para obtener los errores del email
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no valido' : '';
  }

  //Metodo para registrar un usuario
  registerUser() {
    console.log("Formulario de registro: ", this.registerForm.value);
  }

  //Metodo destroy
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
