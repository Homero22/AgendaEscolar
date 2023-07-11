import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CountryModel } from 'src/app/core/models/countries';
import { CountrieService } from 'src/app/core/services/countrie.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';
import { AdministradorService } from 'src/app/core/services/administrador.service';

@Component({
  selector: 'app-editar-admins',
  templateUrl: './editar-admins.component.html',
  styleUrls: ['./editar-admins.component.css']
})
export class EditarAdminsComponent {
   @Input() idAdmin!: number;

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

    this.email = new FormControl( '' , [Validators.required, Validators.email]);

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
          '',
        ],
      estado:
        [
          '',
        ]
    });
  }



   ngOnInit(): void {
    console.log("idAdmin =>",this.idAdmin);
    this.getAdmin(this.idAdmin);
    // console.log("admin en edit componet=>",this.srvAdmins.admin);
    this.getCountries();
   }

   getAdmin(id: number) {
    this.srvAdmins.getAdministrador(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if (value.status){
            this.srvAdmins.admin = value.body;
            console.log("admin ", this.srvAdmins.admin);
            this.completForm();
          }
        }
      })
  }

   completForm(){
    this.email = new FormControl( this.srvAdmins.admin.correo , [Validators.required, Validators.email]);

    this.registerForm = this.formBuilder.group({
      nombre:
        [
          this.srvAdmins.admin.nombre,
          [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")]
        ],
      apellido:
        [
          this.srvAdmins.admin.apellido,
          [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")]
        ],
      rol:
        [
          'ADMINISTRADOR',
        ],
      telefono:
        [
          this.srvAdmins.admin.telefono,
          [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]
        ],
      correo: this.email,
      contrasena:
        [
          this.srvAdmins.admin.contrasena,
          [Validators.required]
        ],
      paisId:
        [
          //Hacemos que se seleccione el valor como numero
          this.srvAdmins.admin.paisId,
          [Validators.required]
        ],
      nivelEstudio:
        [
          this.srvAdmins.admin.nivelEstudio,
          [Validators.required]
        ],
      fechaCreacion:
        [
          this.srvAdmins.admin.fechaCreacion,
        ],
      estado:
        [
          this.srvAdmins.admin.estado,
        ]
    });
    console.log("registerForm =>",this.registerForm.value);
   }

   editUser(){
    console.log("editUser =>",this.registerForm.value);
    Swal.fire({
      title: '¿Estas seguro de editar este administrador?',
      showDenyButton: true,
      confirmButtonText: `Editar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
    this.srvAdmins.putAdministrador(this.idAdmin, this.registerForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (value) => {
        if (value.status) {
          Swal.fire({
            icon: 'success',
            title: 'Administrador actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.registerForm.reset();
        }
      }
    })
    })
   }

   getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no valido' : '';
  }


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

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
