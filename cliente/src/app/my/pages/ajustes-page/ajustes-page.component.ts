import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { CountrieService } from 'src/app/core/services/countrie.service';

@Component({
  selector: 'app-ajustes-page',
  templateUrl: './ajustes-page.component.html',
  styleUrls: [ './ajustes-page.component.css'
  ]
})
export class AjustesPageComponent implements OnInit {
  private destroy$ = new Subject<any>();

  idUser!: any;
  email!: FormControl;
  userName!: string;
  hide = true;
  idPais!: any;
  myForm!: FormGroup;

  paisName!: string;

  disabled: boolean = true;


  constructor(
    public srvUsuario: UsuarioService,
    public fb: FormBuilder,
    public srvCountries: CountrieService
  ) {

    this.email = new FormControl('', [Validators.required, Validators.email]);

    //Declaramos el formulario
    this.myForm = this.fb.group({
      id: ['',],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: this.email,
      contrasena: ['', [Validators.required]],
      nivelEstudio: ['', [Validators.required]],
      paisId: ['',],
      estado: ['',],
      rol: ['',],
      fechaCreacion: ['',],
    });
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
    this.completeInfo();
  }

  //Funcion para completar la información del usuario
  completeInfo(){
    this.getUserByID();
    //Completamos el formulario con la información del usuari
  }

  //Metodo para obtener los errores del email
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    return this.email.hasError('email') ? 'Email no valido' : '';
  }



  //Función para obtener la información del usuario
  getUserByID(){

    Swal.fire({
      title: 'Cargando información',
      text: 'Espere un momento por favor',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    });

    this.srvUsuario.getUserByID(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(res)=>{
        Swal.close();
        console.log(res);
        this.srvUsuario.usuarioData = res.body;
        console.log("Contenido en usuarioData => ",this.srvUsuario.usuarioData);
        //completamos la informacion del formulario
        this.myForm = this.fb.group({
          id: [this.srvUsuario.usuarioData.id],
          nombre: [this.srvUsuario.usuarioData.nombre, [Validators.required]],
          apellido: [this.srvUsuario.usuarioData.apellido, [Validators.required]],
          telefono: [this.srvUsuario.usuarioData.telefono, [Validators.required]],
          correo: [this.srvUsuario.usuarioData.correo, [Validators.required]],
          contrasena: [this.srvUsuario.usuarioData.contrasena, [Validators.required]],
          nivelEstudio: [this.srvUsuario.usuarioData.nivelEstudio],
          paisId: [this.srvUsuario.usuarioData.paisId],
          estado: [this.srvUsuario.usuarioData.estado],
          rol: [this.srvUsuario.usuarioData.rol],
          fechaCreacion: [this.srvUsuario.usuarioData.fechaCreacion],
        });
        this.idPais = this.srvUsuario.usuarioData.paisId;
        this.getCountry();
        console.log("Contenido del Formulario => ",this.myForm.value)
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("complete");
      }
    });
  }

    //Metodo para obtener los paises
    getCountry(){
      this.srvCountries.getCountryById(this.idPais)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(res)=>{
          this.paisName = res.nombre;
          console.log("Valor del Pais =>", res);
        },
        error:(err)=>{
          console.log(err);
        },
        complete:()=>{
          console.log("complete");
        }
      });
    }

  //Función para actualizar la información del usuario
  updateAccount(){

    const sendUsuarioData = this.myForm.value;

    Swal.fire({
      title:'Esta seguro de modificar su información?',
      showDenyButton:true,
      confirmButtonText:'Actualizar',
      denyButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvUsuario.putUser(this.idUser, sendUsuarioData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(resUser)=>{
            if(resUser.status){
              Swal.fire({
                title:'Información actualizada con éxito!',
                icon:'success',
                showConfirmButton: false,
                timer: 1500
              })
              console.log("Informacion actualizado con exito =>",resUser);
            }else{
              Swal.fire({
                title:'Error al actualizar información!',
                icon:'error',
                showConfirmButton: false,
                timer: 1500
              })
              console.log("Error al actualizar información =>",resUser);
            }
            setTimeout(() => {
              Swal.close();
            }, 3000);
          },
          error:(err)=>{
            console.log(err);
          },
          complete:()=>{
            console.log("complete");
          }
        });
      }
    });
  }


    ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
    }

}
