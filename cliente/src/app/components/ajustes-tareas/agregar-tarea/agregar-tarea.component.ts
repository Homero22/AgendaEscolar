import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from 'src/app/core/services/tarea.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { MateriaService } from 'src/app/core/services/materia.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.css'],
  // standalone: true,
})
export class AgregarTareaComponent {

  //creamos el formulario myForm
  myForm!: FormGroup;
  private destroy$ = new Subject<any>();
  idUser: any;
  selectedEstado: any;
  selectedMateria: any;

  value_string_time: any;
  time_vencimiento: any;
  constructor(
    private fb: FormBuilder,
    private srvTarea: TareaService,
    public srvMateria: MateriaService,
    public datePipe: DatePipe
  ) {
    this.idUser = sessionStorage.getItem("id");
    this.idUser = parseInt(this.idUser);

    /*
    {
    "id":0,
    "idUser":4,
    "idMateria":22,
    "tareaTitulo":"Marco 1",
    "tareaDescripcion": "documentacion de la metodologia",
    "fechaCreacion":"",
    "fechaFin": "07:00:00",
    "tareaEstado": "FINALIZADA",
    "tareaRecordatorio": "13:00:00"
}
    */
    //inicializamos el formulario
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
  }
  
  transforDate(dateFin: Date){
    // const fechaFin = new Date("Sun Jun 25 2023 19:00:00 GMT-0500");

const datePipe = new DatePipe('en-US');
const fechaFormateada = datePipe.transform(dateFin, 'yyyy-MM-dd');
this.myForm.get('fechaFin')?.setValue(fechaFormateada);
console.log(fechaFormateada); // Resultado: "2023/06/25"
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

  //Función para agregar una materia
  agregarTarea(){

    //transformar el valor de la hora a string
    this.transforDate(this.myForm.value.fechaFin);


    this.transforDate(this.myForm.value.fechaFin);

    Swal.fire({
      title: 'Agregando Tarea...',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.srvTarea.postTarea(this.myForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(tareaData)=>{
        Swal.close();
        if(tareaData.body){
          console.log("Valor de tareaData.body =>",tareaData.body);
          Swal.fire({
            icon: 'success',
            title: 'Tarea Agregada',
            showConfirmButton: false,
            timer: 3000
          });
          this.myForm.reset();
          this.getTareasEstado(1);
          this.getTareas();
        }else{
          console.log("No hay datos");
        }
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

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
