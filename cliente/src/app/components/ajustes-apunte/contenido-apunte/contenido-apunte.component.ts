import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { promptModel  } from 'src/app/core/models/gpt';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { ContenidoService } from 'src/app/core/services/contenido.service';
import { GptService } from 'src/app/core/services/gpt.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

// Importamos el promptModel de servidork



@Component({
  selector: 'app-contenido-apunte',
  templateUrl: './contenido-apunte.component.html',
  styleUrls: ['./contenido-apunte.component.css']
})
export class ContenidoApunteComponent implements OnInit {

  // Variables
  private destroy$ = new Subject<void>();
  idUser: any;
  idApunte: any;

  apunteContent: any;
  mensaje!: string;
  promptResult: any;
  showMaterialContent: boolean = false;

  contentLabel!: string;
  contentPuntuacion!: string;
  showLabel: boolean = false;

  myform!: FormGroup;

  constructor(
    public srvApuntes: ApunteService,
    public srvGPT: GptService,
    public fb: FormBuilder,
    public srvContenido: ContenidoService,
    public srvModal: ModalService,
  ) {
    this.myform = this.fb.group({
      id: [0],
      idApunte: [''],
      idUser: [''],
      contenido: [''],
      estado: ['', [Validators.required]],
      puntuacion: ['', [Validators.required] ],
      categoria: ['', [Validators.required]]
    });
  }

  ngOnInit() {

    this.idUser = sessionStorage.getItem("id");

    this.srvApuntes.selectIdApunte$
    .pipe(takeUntil(this.destroy$))
    .subscribe((idApunte: any) => {
      this.idApunte = idApunte;
      this.myform.controls['idApunte'].setValue(this.idApunte);
    });

    console.log("Valor del idApunte =>",this.idApunte);
    console.log("Valor del idUser =>",this.idUser);
    this.myform.controls['idUser'].setValue(this.idUser);


    this.getApunteData();
    // this.getMaterialEstudio();
    this.getContent();
  }

  getApunteData(){

    Swal.fire({
      title: 'Cargando contenido del apunte',
      didOpen: () => {
        Swal.showLoading()
      },
    });

    this.srvApuntes.getApunteIndividual(this.idApunte)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        if(res.status){
          Swal.close();
          console.log("Respuesta del servidor =>",res);
          this.apunteContent = res.body;
          console.log("Contenido del apunte =>",this.apunteContent);
          this.getPrompt();
        }
      },
      error: (err: any) => {
        console.log("Error del servidor =>",err);
      },
      complete: () => {
        console.log("Petición completa");
      }
    });
  }

  getPrompt() {

    this.srvGPT.postPrompt(this.idApunte, this.apunteContent)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        console.log("Respuesta del servidor =>",res);
        this.mensaje = res.body;
      },
      error: (err: any) => {
        console.log("Error del servidor =>",err);
      },
      complete: () => {
        console.log("Petición completa");
      }
    });
  }


  generateContent(){

    const promptData: promptModel  = {
      mensaje: this.mensaje
    }

    console.log("Valor del promptMessage =>",this.mensaje);
    console.log("tipo de message => ", typeof this.mensaje);

    Swal.fire({
      title: 'Generando contenido',
      text: 'Esto puede tardar unos segundos',
      didOpen: () => {
        Swal.showLoading()
      },
    });


    this.srvGPT.postMessage(promptData)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        if(res.status){
          console.log("Respuesta del servidor =>",res);
          this.promptResult = res.info;
          this.showMaterialContent = true;
          this.myform.controls['contenido'].setValue(this.promptResult);
        }
        Swal.close();
      },
      error: (err: any) => {
        console.log("Error del servidor =>",err);
      },
      complete: () => {
        console.log("Petición completa");
      }
    });
  }

  postContenido(){
    //Transformamos el valor del id user a number
    this.myform.controls['idUser'].setValue(Number(this.myform.value.idUser));
    //Transformamos el valor del puntuacion a number
    this.myform.controls['puntuacion'].setValue(Number(this.myform.value.puntuacion));

    console.log("Valor del formulario =>",this.myform.value);

    const contenidoData = this.myform.value;

    Swal.fire({
      title: 'Guardar Contenido',
      text: 'Esta seguro de guardar el contenido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.srvContenido.postContenido(contenidoData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            if(res.status){
              console.log("Respuesta del servidor =>",res);
              Swal.fire({
                title: 'Contenido guardado',
                text: res.message,
                icon: 'success',
                showConfirmButton:false,
              })
            }else{
              console.log("Respuesta del servidor =>",res);
              Swal.fire({
                title: 'Error al guardar el contenido',
                text: res.message,
                icon: 'error',
                showConfirmButton:false,

              })
            }
            setTimeout(() => {
              Swal.close();
            }, 3000);
          },
          error: (err: any) => {
            console.log("Error del servidor =>",err);
            Swal.fire({
              title: 'Error al guardar el contenido',
              text: err.message,
              icon: 'error',
              showConfirmButton:false,
            })
          },
          complete: () => {
            console.log("Petición completa");
            // this.srvModal.setCloseMatDialog(true);
            // this.myform.reset();
          }
        });
      }
    });
  }

  getContent(){

    this.srvContenido.getContent(this.idApunte)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: any) => {
        if(res.status){
          this.myform = this.fb.group({
            id: [
              res.body.id,
            ],
            idApunte: [
              res.body.idApunte,
            ],
            idUser: [
              res.body.idUser,
            ],
            contenido: [
              res.body.contenido,
            ],
            estado: [
              res.body.estado,
            ],
            puntuacion: [
              res.body.puntuacion,
            ],
            categoria: [
              res.body.categoria,
            ],
          });
          this.showMaterialContent = true;
          this.contentLabel = this.myform.value.contenido;
          this.showLabel = true;

        }else{
          this.showMaterialContent = false;
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
