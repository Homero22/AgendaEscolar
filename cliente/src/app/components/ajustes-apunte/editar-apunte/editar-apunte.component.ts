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

  // Variables para el chip de ideas
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ideas: Idea[] = [];
  announcer = inject(LiveAnnouncer);

  textControl: FormControl = new FormControl('');
  private destroy$ = new Subject<any>();

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
  idMateria: any;
  idApunte: any;
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

    //Función para completar el Formulario
    this.completeForm();
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



  ngOnDesTroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
