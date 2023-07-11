import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { Subject, takeUntil } from 'rxjs';
import { HorarioService } from 'src/app/core/services/horario.service';
import { Horario, ModelShowHorario, addDataHorario } from 'src/app/core/models/horario';
import { LoguinService } from 'src/app/core/services/loguin.service';
import Swal from 'sweetalert2';
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
    this.idUser = sessionStorage.getItem("id");
    //idUser de String a number
    this.idUser = parseInt(this.idUser);

    this.srvMateria.selectIdMateria$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(idMateria: number)=>{
        this.idMateria = idMateria;
        this.materia = new FormControl(this.idMateria, [Validators.required]);
        this.materiaForm = this.fb.group({
          materia: this.materia,
          // acronimo: ['', Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
          // color: ['', Validators.required, Validators.pattern(/^#[0-9A-F]{6}$/i)]
        });
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
        console.log("idHorario en editar-horario =>", this.idHorario);
      }
    })

    if(this.srvMateria.datosMateria===undefined){
      this.getMaterias();
    }
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
    const horaFin = this.addHoursToTime(this.hora, 1)
    const horaIncio = this.addHoursToTime(this.hora, 0)
    console.log("hora fin", horaFin);
    const addHorario ={
      id: this.idHorario,
      idMateria: this.selected.id,
      idUser: this.idUser,
      hora_inicio: horaIncio,
      hora_fin: horaFin,
      dia: this.dia
    }

    console.log("form 'addHorario'", addHorario);
    console.log("idHorario", this.idHorario);
    console.log("idMateria", this.idMateria);
    console.log("idUser", this.idUser);
    console.log("selected.id", this.selected.id);

    if(this.idHorario === -1 && this.selected.id !== undefined){
      console.log("Deseo agregar el horario");
      this.addHorario(addHorario);
    }
    if(this.idHorario !== -1 && this.idMateria !== undefined  && this.selected.id !== undefined){
      console.log("Deseo actualizar el horario", this.idMateria);
      this.actualizarHorario(addHorario);
    }
    if ( this.selected.id === undefined && this.idHorario !== -1){
      console.log("Deseo boorar el horario");
      this.deleteHorario();
    }
  }

  deleteHorario(){
    // Swal.fire({
    //   title: 'Cargando...',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })
    this.srvHorario.deleteHorario(this.idHorario)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(horarioData)=>{
        // Swal.close();
        console.log("Valor de horarioData en deleteHorario =>", horarioData);
        if(horarioData.status){
          this.obtenerHorario();
          this.idHorario = -1;
          Swal.fire({
            icon: 'success',
            title: horarioData.message,
            showDenyButton: false,
            confirmButtonText: `Aceptar`,
          })
          // this.srvModal.closeModal();
          this.srvModal.setCloseMatDialog(true);

        }else{
          console.log("No se pudo eliminar el horario");
          Swal.fire({
            title: horarioData.message,
            icon: 'warning',
            showDenyButton: false,
            confirmButtonText: `Aceptar`,
          });
        }
      },error:(err)=>{
        console.log("Error en la peticion =>",err);
      },
      complete:()=>{
        // Swal.close();
      }
    })
  }

  addHorario(data: addDataHorario){
    // Swal.fire({
    //   title: 'Cargando...',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    this.srvHorario.postHorario(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(horarioData)=>{
        // Swal.close();
        console.log("Valor de horarioData en addHorario =>", horarioData);
        if(horarioData.status){
          this.obtenerHorario();
          Swal.fire({
            icon: 'success',
            title: horarioData.message,
            showConfirmButton: false,
            timer: 3000
          })
          this.idHorario = horarioData.body.id;
          // this.srvModal.closeModal();
          this.srvModal.setCloseMatDialog(true);

        }else{
          console.log("No hay datos");
          Swal.fire({
            icon: 'error',
            title: horarioData.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
      },complete:()=>{
        // Swal.close();
      }
    })
  }

  actualizarHorario(data: addDataHorario){
    this.srvHorario.putHorario(this.idHorario, data)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(horarioData)=>{
        console.log("Valor de horarioData en actualizarHorario =>", horarioData);
        if(horarioData.status){
          this.obtenerHorario();
          Swal.fire({
            icon: 'success',
            title: horarioData.message,
            showConfirmButton: false,
            timer: 3000
          })
          this.srvModal.setCloseMatDialog(true);

          // this.srvModal.closeModal();
        }else{
          console.log("No se pudo actualizar el horario");
          Swal.fire({
            icon: 'error',
            title: horarioData.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
      }
    })
  }

  addHoursToTime(time: string, hours: number): string {
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
  
    let newHour = hour + hours;
    let newMinute = minute;
  
    if (newHour >= 24) {
      newHour -= 24;
    }
  
    const newTime = `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
    return newTime;
  }

  obtenerHorario(){
    Swal.fire({
      title: 'Cargando Horario...',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.srvHorario.getHorarioUser(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (homero: ModelShowHorario)=>{
        console.log("Valor de homero en obtener Horario=>", homero);
        this.srvHorario.dataHorario = homero.body;
          console.log("Horario de homero =>", homero);
          // this.srvHorario.dataorario = this.srvHorario.transfor(homero.body, this.srvHorario.horario)
          this.transf();
          console.log("Horario transdormado en horario=>", this.srvHorario.horario);
          Swal.close();
      }
    })
  }

  transf(){
    const horario: Horario = this.srvHorario.dataHorario.reduce((acc: Horario, item) => {
      const { dia, hora_inicio, hora_fin, nombreMateria, acronimo, color, id, idMateria } = item;
      const horaInicioStr = `${hora_inicio.hour}:${hora_inicio.minute.toString().padStart(2, '0')}`;
      const horaFinStr = `${hora_fin.hour}:${hora_fin.minute.toString().padStart(2, '0')}`;
    
      if (!acc[dia]) {
        acc[dia] = {};
      }
    
      acc[dia][horaInicioStr] = {
        materia: nombreMateria,
        horaFin: horaFinStr,
        color: color,
        acronimo: acronimo,
        id: id,
        idMateria: idMateria
      };
    
      return acc;
    }, {});
  
    console.log("horario transformado =>", horario);
    this.srvHorario.horario = horario;
  }

ngOnDestroy(): void {
  this.destroy$.next({});
  this.destroy$.complete();
}

}
