import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { LoguinService } from 'src/app/core/services/loguin.service';
import {modelRecover} from 'src/app/core/models/loguin'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recover-page',
  templateUrl: './recover-page.component.html',
  styleUrls: [

    './recover-page-component.css',

  ]
})
export class RecoverPageComponent {
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
   public srvUsuario: UsuarioService,
   public srvLogin: LoguinService

 ) {

   this.email = new FormControl('', [Validators.required, Validators.email]);

   this.registerForm = this.formBuilder.group({
  
       email: this.email,
       
   });
 }

 //Metodo ngOnInit
 ngOnInit(): void {}

 //Metodo para obtener los errores del email
 getErrorMessage() {
   if (this.email.hasError('required')) {
     return 'Debe ingresar un correo';
   }

   return this.email.hasError('email') ? 'Email no valido' : '';
 }

 //Metodo para registrar un usuario
 recoverUser() {
  Swal.fire({
    title: "Cargando..",
    text: "Contraseña enviada al correo electrónico", 
    didOpen() {
      Swal.showLoading();
    }, 
  });
   console.log("Formulario de registro: ", this.registerForm.value);
   this.srvLogin.postrecover(this.registerForm.value)
   .pipe(takeUntil(this.destroy$)) 
   .subscribe((res: modelRecover) => {
    console.log("Usuarios => ", res);
    Swal.close();
    if (res.status){
      console.log("Exito en recuperar la contraseña")
      Swal.fire({
        title: res.message, 
      })    
    }

  });
  }

 //Metodo destroy
 ngOnDestroy(): void {
   this.destroy$.next({});
   this.destroy$.complete();
 }
}
