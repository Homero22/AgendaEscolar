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
  apunteIdeas = new FormControl('', [Validators.required]);
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
        [
          Validators.required,
        ]
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
        [
          Validators.required,
        ]
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
    console.log("idUser =>",this.idUser)
    this.myForm.get('idUser')?.setValue(this.idUser);
    console.log("Valor del idUser de mhyForm", this.myForm.get('idUser')?.value);
    this.currentDate = new Date().toISOString().slice(0, 10);
    console.log("valor de currentDate =>", this.currentDate);
    this.getMaterias();
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      // this.ideas.push({name: value});
      // console.log("Valor de ideas =>", this.ideas);
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
      // this.ideas.splice(index, 1);
      // this.announcer.announce(`Removed ${idea}`);
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
    //imprimimos en consola el valor de myform
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
                title:'Apunte agregado correctamente',
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
          }
        });
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
  getMaterias(){
    this.srvMateria.getMateriasUsuario(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(materiaData)=>{
        if(materiaData.body){
          this.srvMateria.datosMateria = materiaData.body;
          console.log("Valor de materiaData.body =>",this.srvMateria.datosMateria);
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
