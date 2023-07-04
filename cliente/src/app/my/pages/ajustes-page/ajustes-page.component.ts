import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajustes-page',
  templateUrl: './ajustes-page.component.html',
  styleUrls: [ './ajustes-page.component.css'
  ]
})
export class AjustesPageComponent implements OnInit {
  private destroy$ = new Subject<any>();

  idUser!: any;

  myForm!: FormGroup;


  constructor(
    public srvUsuario: UsuarioService,
    public fb: FormBuilder
  ) {

    //Declaramos el formulario
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
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

  //Función para obtener la información del usuario
  getUserByID(){
    this.srvUsuario.getUserByID(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.srvUsuario.usuarioData = res.body;
        console.log("Contenido en usuarioData => ",this.srvUsuario.usuarioData);
        //completamos la informacion del formulario
        this.myForm.setValue({
          nombre: this.srvUsuario.usuarioData.nombre,
          apellido: this.srvUsuario.usuarioData.apellido,
          telefono: this.srvUsuario.usuarioData.telefono,
          correo: this.srvUsuario.usuarioData.correo,
          contrasena: this.srvUsuario.usuarioData.contrasena
        });
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


ngOnDestroy(): void {
  this.destroy$.next({});
  this.destroy$.complete();
}

}
