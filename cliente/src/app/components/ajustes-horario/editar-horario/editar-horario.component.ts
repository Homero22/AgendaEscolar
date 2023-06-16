import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { Subject, takeUntil } from 'rxjs';
import { HorarioService } from 'src/app/core/services/horario.service';
import { Horario, HorarioItem } from 'src/app/core/models/horario';
import { LoguinService } from 'src/app/core/services/loguin.service';
@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.css'],

})
export class EditarHorarioComponent {

  destroy$ = new Subject<any>();

  materiaForm!: FormGroup;
  materia!: FormControl;
  selected: any;
  idMateria: any;
  idUser: any;
  idHorario: any;

  hora!: any;
  dia!: any;

  constructor(
    public fb: FormBuilder,
    public srvModal: ModalService,
    public srvMateria: MateriaService,
    public srvHorario: HorarioService,
    public srvLoguin: LoguinService
  ) {
    this.materia = new FormControl('', [Validators.required]);
    this.materiaForm = this.fb.group({
      materia: this.materia,
      // acronimo: ['', Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
      // color: ['', Validators.required, Validators.pattern(/^#[0-9A-F]{6}$/i)]
    });

  }

  ngOnInit(): void {
    this.srvMateria.selectIdMateria$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(idMateria: number)=>{
        this.idMateria = idMateria;
      }
    });

    this.srvHorario.selectDia$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (dia: string)=>{
        this.dia = dia;
      }
    })
    
    this.srvHorario.selectHora$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (hora: string)=>{
        this.hora = hora
      }
    })

    this.srvHorario.selectIdHorario$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (idHorario: number)=>{
        this.idHorario = idHorario;
      }
    })

    if(this.srvMateria.datosMateria===undefined){
      this.getMaterias();
    }
    this.idUser = sessionStorage.getItem("id");
    this.transfor();
  }

  getMaterias(){
    this.srvMateria.getMaterias()
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

    console.log("idMeria", this.idMateria);

  }

  submitForm() {
    if (this.materiaForm.valid) {
      const formData = this.materiaForm.value;
      console.log(formData);
    }else{
      this.getErrorMessage();
    }
  }

  getErrorMessage() {
    if (this.materiaForm.get('acronimo')?.hasError('required')) {
      return 'Debe ingresar un acrónimo';
    }

    return this.materiaForm.get('acronimo')?.hasError('pattern') ? 'Acrónimo ingresado no válido' : '';
  }

  onSubmit(){

    this.cambiarMateriaId(this.hora, this.dia, this.selected.nombre, this.selected.id);
  }


  cambiarMateriaId(hora: string, dia: string, nuevaMateria: string, nuevoId: number) {
    console.log("parámetros para cambiar", hora, dia, nuevaMateria, nuevoId);
  
    if (this.srvHorario.horario.hasOwnProperty(dia)) {
      const horarioDia = this.srvHorario.horario[dia];
      if (!horarioDia.hasOwnProperty(hora)) {
        horarioDia[hora] = {} as HorarioItem;
      }
      horarioDia[hora].materia = nuevaMateria;
      horarioDia[hora].id = nuevoId;
      horarioDia[hora].color = this.selected.color;
      horarioDia[hora].acronimo = this.selected.acronimo;
  
      console.log('Materia cambiada con éxito.');
      console.log('Nuevo horario:', this.srvHorario.horario);
    }
    
    console.log("terminó la función cambiarMateriaID");
    this.actualizarHorario();
  }

  actualizarHorario(){

    //encontrar hora fin = hora inicio + 1

    const horaFin = this.hora + 1;
    console.log("hora fin", horaFin);

    const addHorario ={
      id: this.idHorario,
      idMateria: this.selected.id,
      idUser: this.idUser,
      hora_inicio: this.hora,
      hora_fin: horaFin,
      dia: this.dia
    }

    // this.srvHorario.updateHorario(this.idHorario,addHorario)
    // .pipe(takeUntil(this.destroy$))
    // .subscribe({
    //   next: (horarioData)=>{
    //     if(horarioData.status){
    //       console.log("Horario actualizados correctamente =>",horarioData.body);
    //     }else{
    //       console.log("No hay datos");
    //     }
    //   },
    //   error:(err)=>{
    //     console.log("Error en la peticion =>",err);
    //   },
    //   complete:()=>{
    //     console.log("Peticion finalizada");
    //   }
    // });
    // console.log("addHorario", addHorario);
  }

  
  homero=[
    {
        "id": 4,
        "idMateria": 1,
        "idUser": 1,
        "hora_inicio": {
            "hour": 14,
            "minute": 0,
            "second": 0,
            "nano": 0
        },
        "hora_fin": {
            "hour": 15,
            "minute": 0,
            "second": 0,
            "nano": 0
        },
        "dia": "Martes",
        "nombre": "Ciencias Naturales",
        "materiaAcro": "CN",
        "materiaColor": "rojo",
        "profesorNombre": "Diego"
    },
    {
        "id": 5,
        "idMateria": 2,
        "idUser": 1,
        "hora_inicio": {
            "hour": 14,
            "minute": 0,
            "second": 0,
            "nano": 0
        },
        "hora_fin": {
            "hour": 15,
            "minute": 0,
            "second": 0,
            "nano": 0
        },
        "dia": "Lunes",
        "nombre": "Matematicas",
        "materiaAcro": "MT",
        "materiaColor": "rojo",
        "profesorNombre": "Diego"
    },
    {
        "id": 6,
        "idMateria": 2,
        "idUser": 1,
        "hora_inicio": {
            "hour": 14,
            "minute": 0,
            "second": 0,
            "nano": 0
        },
        "hora_fin": {
            "hour": 15,
            "minute": 0,
            "second": 0,
            "nano": 0
        },
        "dia": "miercoles",
        "nombre": "Matematicas",
        "materiaAcro": "MT",
        "materiaColor": "rojo",
        "profesorNombre": "Diego"
    }
]


horario: any  = {
  lunes: {
    '8:00': { materia: 'Matemáticas', horaFin: '9:00', color: '#008000', acronimo: 'MAT', id: 1 },
    // Horarios para otros momentos del lunes
  },
  martes: {
    '8:00': { materia: 'Ciencias', horaFin: '9:00', color: 'verde', acronimo: 'CIE', id:6 },
    // Horarios para otros momentos del martes
  },
  // Horarios para otros días de la semana
};

transfor(){
  console.log("transformando");
  this.homero.forEach(obj => {
    const dia = obj.dia.toLowerCase();
    const horaInicio = `${obj.hora_inicio.hour}:${obj.hora_inicio.minute}`;
    const horaFin = `${obj.hora_fin.hour}:${obj.hora_fin.minute}`;
  
    if (!this.horario[dia]) {
      this.horario[dia] = {}; // Crea el objeto para el día si no existe
    }
  
    if (!this.horario[dia][horaInicio]) {
      this.horario[dia][horaInicio] = {}; // Crea el objeto para la hora si no existe
    }
  
    this.horario[dia][horaInicio] = {
      materia: obj.nombre,
      horaFin: horaFin,
      color: obj.materiaColor,
      acronimo: obj.materiaAcro,
      id: obj.id
    };
  });
  console.log(this.horario);
}

ngOnDestroy(): void {
  this.destroy$.next({});
  this.destroy$.complete();
}

}
