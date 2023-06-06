import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { CountryModel, ShowCountriesModel } from 'src/app/core/models/countries';
import { CountrieService } from 'src/app/core/services/countrie.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

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

  //Declaramos la varible para paises
  countries!: CountryModel[];


  //Creacion del formulario para registro
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public srvUsuario: UsuarioService,
    public srvCountries: CountrieService
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
        rol:
        [
          'USUARIO',
        ],
        telefono:
        [
          '',
          [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]
        ],
        correo: this.email,
        contrasena:
        [
          '',
          [ Validators.required]
        ],
        paisId:
        [
          //Hacemos que se seleccione el valor como numero
          0,
          [ Validators.required]
        ],
        nivelEstudio:
        [
          '',
          [ Validators.required]
        ],
        fechaCreacion:
        [
          this.fechaActual
        ],
        estado:
        [
          'ACTIVO',
        ]
    });
  }


  fechaActual: string = new Date().toISOString();


  //Metodo ngOnInit
  ngOnInit(): void {
    console.log(this.fechaActual);
    // this.getCountries();
  }

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
    //transformamos de string a number el pais
    this.registerForm.value.paisId = Number(this.registerForm.value.paisId);
    this.srvUsuario.postUser(this.registerForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (usuarioData) => {
        console.log('Informacion de Usuario Body =>', usuarioData);

      }
    });
  }

  //Metodo para obtener los paises
  // getCountries() {
  //   this.srvCountries.getCountries()
  //   .pipe(takeUntil(this.destroy$))
  //   .subscribe({
  //     next: (countriesData) => {
  //       console.log('Informacion de Estados Body =>', countriesData);
  //       this.countries = countriesData.body;

  //       console.log("Paises => ", this.countries)
  //     },
  //     error: (err: any) => {
  //       console.log("Error al obtener los paises => ", err);
  //     },
  //   });
  // }

  //Metodo destroy
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
