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
import { modApunteModel } from 'src/app/core/models/apunte';
export interface Idea {
  name: string;
}
@Component({
  selector: 'app-editar-apunte',
  templateUrl: './editar-apunte.component.html',
  styleUrls: ['./editar-apunte.component.css']
})
export class EditarApunteComponent implements OnInit {
  @ViewChild('quillResume') quillResumeRef!: ElementRef;
  [x: string]: any;

  // Variables para el chip de ideas
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ideas: Idea[] = [];
  announcer = inject(LiveAnnouncer);

  textControl: FormControl = new FormControl('');
  private destroy$ = new Subject<any>();

  apunteResumen!: string;
  apunteNotasClase!: string;

  myForm!: FormGroup;
  apunteIdeas = new FormControl('',);
  close!: boolean;
  idUser: any;
  idMateria: any;
  idApunte: any;
  currentDate!: string;
  value_string_time: any;

  content: string = "";

  editor!: any;

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
    this.completeForm();
    this.currentDate = new Date().toISOString().slice(0, 10);
    console.log("Valor de currentDate =>", this.currentDate)
  }

  completeForm(){
    console.log("Valor recibido de ID Apunte =>", this.srvApuntes.selectIdApunte$)

    this.srvApuntes.selectIdApunte$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (_idApunte: number) =>{
        Swal.fire({
          title: 'Cargando',
          didOpen: () => {
            Swal.showLoading()
          },
        });
        this.idApunte = _idApunte;
        console.log("valor de idApunte =>", this.idApunte)
        this.getApunteID()
      },
      error: (err: any)=>{
        console.log("Error al obtener el ID de la materia =>", err);
      },
      complete: ()=>{
        console.log("Petición completa!");
        Swal.close();
      }
    })
  }

  getApunteID(){
    this.srvApuntes.getApunteIndividual(this.idApunte)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (apunteData: modApunteModel) =>{
        Swal.fire({
          title: 'Cargando',
          didOpen: () => {
            Swal.showLoading()
          },
        });
        this.myForm = this.fb.group({
          id:[
            apunteData.body.id
          ],
          idUser:[
            apunteData.body.idUser
          ],
          idMateria: [
            apunteData.body.idMateria
          ],
          apunteTitulo:[
            apunteData.body.apunteTitulo
          ],
          apunteNotasClase:[
            apunteData.body.apunteNotasClase
          ],
          apunteIdeas:[
            apunteData.body.apunteIdeas
          ],
          apunteResumen:[
            apunteData.body.apunteResumen
          ],
          apunteRecordatorio:[
            apunteData.body.apunteRecordatorio
          ],
          fechaCreacion:[
            apunteData.body.fechaCreacion
          ]
        });
        console.log("valor que llega al getApunte =>", apunteData)
      },
      error: (err: any)=>{
        console.log("Error al obtener el apunte =>", err);
      },
      complete: ()=>{
        console.log("Petición completa!");
        Swal.close();
      }
    })
  }

  getMateriaID(){
    this.srvMateria.getMateria(this.idMateria)
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














  transformDate(dateFin: Date){
    const datePipe = new DatePipe('en-US');
    const fechaFormateada = datePipe.transform(dateFin, 'yyyy-MM-dd');
    this.myForm.get('fechaCreacion')?.setValue(fechaFormateada);
    console.log("Fecha Formateada =>",fechaFormateada); // Resultado: "2023/06/25"
  }














  //Función para Enviar la infrmación del apunte
  saveApunte(){
    const fecha = new Date(this.myForm.get('fechaCreacion')?.value);
    const fechaFormateada = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)}`;
    console.log("fechaFormateada =>", fechaFormateada);

    this.myForm.get('fechaCreacion')?.setValue(fechaFormateada);

    const sendApunteData = this.myForm.value;
    console.log("Valor de sendApunteData =>", sendApunteData);



    Swal.fire({
      title:'Esta seguro de modificar este apunte?',
      showDenyButton:true,
      confirmButtonText:'Modificar',
      denyButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvApuntes.putApunte(this.idApunte, sendApunteData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (apunteData)=>{
            console.log("Valor de apunteData =>", apunteData);
            Swal.fire({
              title:'Apunte modificado correctamente',
              icon:'success'
            })
            console.log("Valor de apunteData Modificado =>", apunteData);
          },
          error: (err)=>{
            console.log("Error al modificar el apunte =>", err);
            Swal.fire({
              title:'Error al modificar el apunte',
              icon:'error'
            })
          },
          complete: ()=>{
            console.log("Petición completa!");
          }
        });
      }
    })
  }


  ngOnDesTroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
