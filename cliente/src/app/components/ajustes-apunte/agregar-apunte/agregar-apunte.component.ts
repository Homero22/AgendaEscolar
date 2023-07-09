import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ModalService } from 'src/app/core/services/modal.service';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { DatePipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

export interface Idea {
  name: string;
}

@Component({
  selector: 'app-agregar-apunte',
  templateUrl: './agregar-apunte.component.html',
  styleUrls: ['./agregar-apunte.component.css']
})
export class AgregarApunteComponent implements OnInit {
 @ViewChild('textResume') textResumeRef!: ElementRef;

  // Variables para el chip de ideas
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ideas: Idea[] = [];
  announcer = inject(LiveAnnouncer);

  private destroy$ = new Subject<any>();
  textControl: FormControl = new FormControl('');

  htmlContent: any;
  htmlNotasContent: any;

  moduleQuill={
    toolbar: [
      ['bold', 'italic', 'underline'],        // toggled buttons
      [{ 'align': [] }],
      [{size: ['small', false, 'large']}],  // custom dropdown
    ]
  }

  apunteResumen!: string;
  apunteNotasClase!: string;


  myForm!: FormGroup;
  apunteIdeas = new FormControl('',);
  close!: boolean;
  idUser: any;
  currentDate!: string;
  value_string_time: any;

  content: string = "";

  constructor(
    private fb: FormBuilder,
    private srvApuntes: ApunteService,
    private srvModal: ModalService,
    public srvMateria: MateriaService
  ) {
    this.myForm = this.fb.group({
      id:[
        0,
      ],
      idUser: [
        this.idUser,
      ],
      idMateria:[
        '',
      ],
      apunteTitulo: [
        '',
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\\s#@-]*$")
        ]
      ],
      apunteNotasClase:[
        '',
        [
          Validators.required,
        ]
      ],
      apunteIdeas:this.apunteIdeas,
      apunteResumen:[
        '',
      ]
      ,
      apunteRecordatorio:[
        '',
        [
          Validators.required,
        ]

      ],
      fechaCreacion:[
        '',

      ]
    })
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");

    this.myForm.get('idUser')?.setValue(this.idUser);

    this.currentDate = new Date().toISOString().slice(0, 10);

    this.srvMateria.selectIdMateria$
    .pipe(takeUntil(this.destroy$))
    .subscribe((idMateria: any) => {
      this.myForm.get('idMateria')?.setValue(idMateria);
      console.log("Valor de idMateria =>", idMateria);
    });

    this.getMateria();
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.ideas.push({ name: value });
      this.apunteIdeas.setValue(this.ideas.map(idea => idea.name).join(', '));
      console.log("Valor de ideas =>", this.ideas);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(idea: Idea): void {
    const index = this.ideas.indexOf(idea);
    if (index >= 0) {
      this.ideas.splice(index, 1);
      this.apunteIdeas.setValue(this.ideas.map(idea => idea.name).join(', '));
      this.announcer.announce(`Removed ${idea}`);
    }
  }

  edit(idea: Idea, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove idea if it no longer has a name
    if (!value) {
      this.remove(idea);
      return;
    }

    // Edit existing idea
    const index = this.ideas.indexOf(idea);
    if (index >= 0) {
      this.ideas[index].name = value;
      this.myForm.get('apunteIdeas')!.setValue(this.ideas.map(idea => idea.name));
    }
  }

  onChangeEditor(event: any) {
    if(event.html){
      this.htmlContent = event.html;
    }
  }

  onChangeNotasEditor(event: any) {
    if(event.html){
      this.htmlNotasContent = event.html;
    }
  }

  onEditorResumeChange(event: any) {
    this.myForm.get('apunteResumen')?.setValue(event.html);
  }

  onNotasEditorContentChange(event: any) {
    this.myForm.get('apunteNotasClase')?.setValue(event.html);
    console.log("Valor de event =>", event);
  }

  // Función para agregar el Apunte
  saveApunte(){
    this.myForm.get('fechaCreacion')?.setValue(this.currentDate);
    console.log("Valor de MyForm =>", this.myForm.value);
    this.transformDate(this.myForm.get('fechaCreacion')?.value);
    console.log("Valor de MyForm =>", this.myForm.value);

    Swal.fire({
      title:'Esta seguro de añadir este Apunte?',
      showDenyButton:true,
      confirmButtonText:'Agregar',
      denyButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvApuntes.postApunte(this.myForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(apunteData)=>{
            console.log("Valor de apunteData =>",apunteData);
            if(apunteData.status){
              Swal.fire({
                icon:'success',
                title:apunteData.message,
                showConfirmButton:false,
                timer:1500
              });
              console.log("Apunte agregado correctamente =>",apunteData);
            }else{
              Swal.fire({
                icon:'error',
                title:apunteData.message,
                showConfirmButton:false,
                timer:1500
              });
              console.log("Error al agregar el apunte =>",apunteData);
            }
            setTimeout(() => {
              Swal.close();
            }, 3000);
          },
          error:(err)=>{
            Swal.fire({
              title:'Error al agregar Apunte!',
              icon:'error',
              showConfirmButton: false,
              timer: 1500
            })
            console.log("Error al agregar materia =>", err);
          },
          complete:()=>{
            console.log("Peticion finalizada");
            this.srvModal.setCloseMatDialog(true);
            this.myForm.reset();
            this.getApuntes();
          }
        });
      }
    });

  }

  getApuntes(){
    Swal.fire({
      title: 'Cargando Apuntes...',
      allowOutsideClick: false,
      didOpen:()=>{
        Swal.showLoading();
      }
    });

    this.srvApuntes.getApuntesUsuario(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(apunteData )=>{
        Swal.close();
        if(apunteData.body){
          this.srvApuntes.datosApuntes = apunteData.body;
          console.log("Valor de apunteData.body =>",this.srvApuntes.datosApuntes);
        }else{
          console.log("No hay datos");
        }
      },
      error:(err)=>{
        console.log("Error en la peticion =>",err);
      },
      complete:()=>{
        console.log("Peticion finalizada");
      }
    });
  }


  transformDate(dateFin: Date){
    const datePipe = new DatePipe('en-US');
    const fechaFormateada = datePipe.transform(dateFin, 'yyyy-MM-dd');
    this.myForm.get('fechaCreacion')?.setValue(fechaFormateada);
    console.log(fechaFormateada); // Resultado: "2023/06/25"
  }

  // Funcion para obtener las materias del usuario
  getMateria(){
    this.srvMateria.getMateria(this.myForm.get('idMateria')?.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(materiaData)=>{
        console.log("Valor de materiaData =>",materiaData);
        if(materiaData.body){
          this.srvMateria.materia = materiaData.body;
          console.log("Valor de materiaData.body =>",this.srvMateria.materia);
        }else{
          console.log("No hay datos");
        }
      },
      error:(err)=>{
        console.log("Error en la peticion =>",err);
      },
      complete:()=>{
        console.log("Peticion finalizada");
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
