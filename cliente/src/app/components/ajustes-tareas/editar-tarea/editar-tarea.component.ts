import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from 'src/app/core/services/tarea.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { MateriaService } from 'src/app/core/services/materia.service';
import { DatePipe } from '@angular/common';
import { ModalService } from 'src/app/core/services/modal.service';
// import { MatDialogRef } from '@angular/material/dialog';
// import { ModalComponent } from 'src/app/modal/modal.component';
@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent {


  myForm!: FormGroup;
  private destroy$ = new Subject<any>();
  idUser: any;
  idTarea: any;
  selectedEstado: any;
  selectedMateria: any;

  value_string_time: any;
  time_vencimiento: any;

  constructor(
    private fb: FormBuilder,
    private srvTarea: TareaService,
    public srvMateria: MateriaService,
    public datePipe: DatePipe,
    private srvModal: ModalService,

  ) {
    this.idUser = sessionStorage.getItem("id");
    this.idUser = parseInt(this.idUser);

    this.srvTarea.selectIdTarea$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(idTarea: number)=>{
        this.idTarea = idTarea;
      }
    });

    this.myForm = this.fb.group({
      id: [
        0,
      ],
      idUser: [
        this.idUser,
      ],
      idMateria: [
        '',
        [Validators.required]
      ],
      tareaTitulo: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")],
      ],
      fechaCreacion: [
        '',
      ],
      fechaFin:[ '', [Validators.required]],

      tareaDescripcion: [
        '',
        [
          Validators.required
        ]
      ],
      tareaEstado: [
        '',
        [
          Validators.required
        ]
      ],
      tareaRecordatorio: [
        '',
        [
          Validators.required
        ]
      ],
      horaEntrega:[
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  ngOnInit(): void {
    if(this.srvMateria.datosMateria===undefined){
      this.getMaterias();
    }
    this.completeForm();
  }

  getMaterias(){
    this.srvMateria.getMateriasUsuario(this.idUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(materiaData)=>{
          Swal.close();
          if(materiaData.body){
            this.srvMateria.datosMateria = materiaData.body;
            console.log(" RES MATERIAS DE USUARIO EN EDITAR HORARIO =>",materiaData);
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

  completeForm(){

    this.srvTarea.getTareaId(this.idTarea)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(tareaData)=>{
        if(tareaData.body){
          this.myForm = this.fb.group({
            id: [
              tareaData.body.id,
            ],
            idUser: [
              tareaData.body.idUser,
            ],
            idMateria: [
              tareaData.body.idMateria,
              [Validators.required]
            ],
            tareaTitulo: [
              tareaData.body.tareaTitulo,
              [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")],
            ],
            fechaCreacion: [
              tareaData.body.fechaCreacion,
            ],
            fechaFin:[ tareaData.body.fechaFin, [Validators.required]],

            tareaDescripcion: [
              tareaData.body.tareaDescripcion,
              [
                Validators.required
              ]
            ],
            tareaEstado: [
              tareaData.body.tareaEstado,
              [
                Validators.required
              ]
            ],
            tareaRecordatorio: [
              tareaData.body.tareaRecordatorio,
              [
                Validators.required
              ]
            ],
            horaEntrega:[
              tareaData.body.horaEntrega,
              [
                Validators.required
              ]
            ]
          });
          console.log("Completar formulario", this.myForm.value)
          this.selectedEstado = tareaData.body.tareaEstado;
          this.selectedMateria = tareaData.body.idMateria;

          console.log("Valor de tareaData.body =>",tareaData.body);
        }else{
          console.log("No hay datos");
        }
      
      }
    });

  }

  editTarea(){
    // console.log("Valor de myForm =>",this.myForm.value);
    this.transforDate(this.myForm.value.fechaFin);
    console.log("Valor de myForm =>",this.myForm.value);

    // Swal.
    this.srvTarea.putTarea(this.idTarea,this.myForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(tareaData)=>{
        if(tareaData.body){
          Swal.fire({
            icon: 'success',
            title: 'Tarea editada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.getTareasEstado(1);
          this.getTareas();
          // this.srvModal.setCloseMatDialog(true);
          // this.dialogRef.close();

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo editar la tarea',
          });
        }
      },complete:()=>{
        console.log("Peticion finalizada");
        this.myForm.reset();

      }
    });


  }

  getTareasEstado(estado: number){
    this.srvTarea.getTareasEstado(this.idUser,estado)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(tareaData)=>{
        if(tareaData.body){
          this.srvTarea.tareasPendientes = tareaData.body;
          console.log("Valor de tareasPendientes =>",this.srvTarea.tareasPendientes);
        }else{
          console.log("No hay datos");
        }
      }
    });
  }

  getTareas() {
    this.srvTarea.getTareasUsuario(this.idUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tareaData) => {
          if (tareaData.body) {
            this.srvTarea.tareas = tareaData.body;
            console.log("Valor de tareas =>", this.srvTarea.tareas);
            this.srvTarea.tareasRealizadas = this.filterTareasFinalizadas();
  
          } else {
            console.log("No hay datos");
          }
        }
      });
  }
  
  filterTareasFinalizadas() {
    return this.srvTarea.tareas.filter((tarea: any) => tarea.tareaEstado === 'FINALIZADA');
  }

  transforDate(dateFin: Date){
    // const fechaFin = new Date("Sun Jun 25 2023 19:00:00 GMT-0500");

const datePipe = new DatePipe('en-US');
const fechaFormateada = datePipe.transform(dateFin, 'yyyy-MM-dd');
this.myForm.get('fechaFin')?.setValue(fechaFormateada);
console.log(fechaFormateada); // Resultado: "2023/06/25"
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
