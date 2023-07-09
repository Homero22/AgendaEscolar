import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CountryModel } from 'src/app/core/models/countries';
import { CountrieService } from 'src/app/core/services/countrie.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';
import { AdministradorService } from 'src/app/core/services/administrador.service';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agregar-admins',
  templateUrl: './agregar-admins.component.html',
  styleUrls: ['./agregar-admins.component.css']
})
export class AgregarAdminsComponent {

  // dataSource = new MatTableDataSource<UsuarioModel>;

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

  fechaActual: string = new Date().toISOString();

  constructor(
    private formBuilder: FormBuilder,
    public srvUsuario: UsuarioService,
    public srvCountries: CountrieService,
    public srvAdmins: AdministradorService,

  ) {

    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.registerForm = this.formBuilder.group({
      nombre:
        [
          '',
          [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")]
        ],
      apellido:
        [
          '',
          [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")]
        ],
      rol:
        [
          'ADMINISTRADOR',
        ],
      telefono:
        [
          '',
          [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]
        ],
      correo: this.email,
      contrasena:
        [
          '',
          [Validators.required]
        ],
      paisId:
        [
          //Hacemos que se seleccione el valor como numero
          0,
          [Validators.required]
        ],
      nivelEstudio:
        [
          '',
          [Validators.required]
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

  
  ngOnInit(): void {
    console.log("fecha actual ", this.fechaActual);
    this.getCountries();
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

    //Swal con mensaje de Cargando
    Swal.fire({
      title: 'Cargando',
      text: 'Por favor espere...',
      allowOutsideClick: false,
      //denegamos que el usuario puedar salir por medio del ESC
      allowEscapeKey: false,
      //Colocamos la animacion de loading
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.srvUsuario.postUser(this.registerForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usuarioData) => {

          console.log("Informacion de Usuario => ", usuarioData);
          if (usuarioData.status == true) {
            this.registerForm.reset();
            Swal.close();
            Swal.fire({
              title: 'Se ha resgistrado con éxito!',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              allowEscapeKey: false,
              allowOutsideClick: false,
              showConfirmButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                // this.getAdministradores();
              }
            })

          } else if (usuarioData.status == false) {
            Swal.close();
            Swal.fire({
              title: 'Opps!',
              icon: 'error',
              text: 'Parece que el correo o teléfono ya fueron registrados!',
              confirmButtonText: 'Aceptar',
              allowEscapeKey: false,
              allowOutsideClick: false,
              showConfirmButton: true
            })
          }
        },
        error: (err: any) => {
          console.log("Error al registrar el usuario => ", err);
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que surgio un error al registrarte!',
            //colocamos un boton de confirmacion
            confirmButtonText: 'Aceptar',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: true
          })
        },
        complete: () => {
          // this.registerForm.reset();

          //hacer que me redireccione al login


        }
      });
  }

  //Metodo para obtener los paises
  getCountries() {
    this.srvCountries.getCountries()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (countriesData) => {
          console.log('Informacion de Estados Body =>', countriesData);
          this.countries = countriesData.body;

          console.log("Paises Body => ", this.countries)
        },
        error: (err: any) => {
          console.log("Error al obtener los paises => ", err);
        },
      });
  }

  // getAdministradores() {
  //   this.srvAdmins.getAdministradores()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (value) => {
  //         this.srvAdmins.administradores = value.body
  //         console.log("administradores ", this.srvAdmins.administradores)
  //       },
  //       complete: () => {
  //         this.dataSource = new MatTableDataSource<UsuarioModel>(this.srvAdmins.administradores);
  //         console.log("administradores this.dataSource ", this.dataSource)
  //       }

  //     })
  // }
  //Metodo destroy
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
