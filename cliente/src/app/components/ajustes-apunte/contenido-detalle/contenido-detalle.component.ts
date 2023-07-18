import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { ContenidoService } from 'src/app/core/services/contenido.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';
import { S } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-contenido-detalle',
  templateUrl: './contenido-detalle.component.html',
  styleUrls: ['./contenido-detalle.component.css']
})
export class ContenidoDetalleComponent implements OnInit {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  idContenido!: number;
  contenidoTitle!: string;
  idUser!: number;
  idApunte!: number;
  ourId!: any;

  myForm!: FormGroup;


  private destroy$ = new Subject<any>();
  nombreUser: any;

  constructor(
    public srvApuntes: ApunteService,
    public srvContenido: ContenidoService,
    public srvUsuarios: UsuarioService,
    public form: FormBuilder,
  ) {
    this.myForm = this.form.group({
      id: [''],
      idUser: [''],
      idContent: [''],
    });
   }

  ngOnInit(): void {

    this.ourId = sessionStorage.getItem("id");

    this.srvContenido.selectIdContenido$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(_idContenido)=>{
        this.idContenido = _idContenido;
        console.log("Valor de idContenido En ContenidoDetalle =>",this.idContenido);
      }
    });

    this.srvContenido.selectTitle$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(_title)=>{
        this.contenidoTitle = _title;
        console.log("Valor de contenidoTitle En ContenidoDetalle =>",this.contenidoTitle);
      }
    })

    this.getContent();

    this.myForm.get('id')?.setValue(0);
    this.myForm.get('idUser')?.setValue(this.ourId);
    this.myForm.get('idContent')?.setValue(this.idContenido);

  }

  //Metodo para obtener la informacion del contenido

  getContent(){

    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un momento',
      didOpen:()=>{
        Swal.showLoading();
      }
    })

    this.srvContenido.getContenidoDetalle(this.idContenido)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resContent)=>{
        if(resContent.status){
          Swal.close();
          console.log("Valor de resContent =>",resContent);
          this.srvContenido.contentData = resContent.body;
          this.idUser = resContent.body.idUser;
          this.idApunte = resContent.body.idApunte;
          this.getUserInfo();
          // this.getApunteInfo();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo obtener la informacion del contenido'
          });
        }
        setTimeout(() => {}, 1000);
      },
      error: (err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo obtener la informacion del contenido'
        });
      },
      complete: ()=>{
        console.log("Valor de contentData =>",this.srvContenido.contentData);
      }
    });
  }

  // Metodo para obtener la informacion del usuario
  getUserInfo(){

    this.srvUsuarios.getUserByID( this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resUser)=>{
        console.log("Valor de resUser =>",resUser);
        this.srvUsuarios.userData = resUser.body;
        console.log("Valor de userData =>",this.srvUsuarios.userData);
        this.nombreUser = resUser.body.nombre + " " + resUser.body.apellido;
      }
    });
  }

  // Method to post the content to the database
  postContent(){

    const formValue = this.myForm.value;
    console.log("Valor de formValue =>",formValue);

    Swal.fire({
      title: 'Esta seguro?',
      text: "Se guardara el contenido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvContenido.postContenidoGuardado(formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (resPost)=>{
            if(resPost.status){
              Swal.fire({
                icon: 'success',
                title: 'Guardado',
                text: 'Se guardo el contenido correctamente'
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo guardar el contenido'
              });
            }
          },
          error: (err)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo guardar el contenido'
            });
          },
          complete: ()=>{
            console.log("Valor de resPost =>");
          }
        })
      }
    })
  }




  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
