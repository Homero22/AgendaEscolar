import {  Component, HostListener, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { HorarioService } from 'src/app/core/services/horario.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { Subject, takeUntil } from 'rxjs';
import { Horario, HorarioItem, ModelShowHorario } from 'src/app/core/models/horario';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit{

  pantallaMediana: boolean;
  calendarVisible = true;
  display = false;
  left = 0;
  top = 0;
  tooltipInitialized = false;
  idUser: any;

  horario: Horario = {};
  homero!: any;

  private destroy$ = new Subject<any>();

  constructor(
    private srvModal: ModalService,
    private dialog: MatDialog,
    public srvHorario: HorarioService,
    public srvMateria: MateriaService

  ) {
    this.pantallaMediana = this.calcularPantallaMediana();

  }

  ngOnInit() {
    this.obtenerHorario();

    const dia = 'lunes';
    const hora = '8:00';
    const materia = this.ObtenerMateria( hora, dia);
    const color = this.ObtenerColorMateria(hora, dia);
    if (materia) {
      console.log('Materia:', materia);
      console.log('Color:', color);
    } else {
      console.log('No se encontró una materia para el día y hora especificados.');
    }
    this.idUser =  sessionStorage.getItem('id');
    console.log("id user =>", this.idUser);
    
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Actualizar el valor de pantallaMediana cuando se redimensiona la pantalla
    this.pantallaMediana = this.calcularPantallaMediana();
  }

  calcularPantallaMediana(): boolean {
    // Obtener el ancho de la pantalla
    const screenWidth = window.innerWidth;

    // Definir el ancho límite para considerar una pantalla como mediana
    const limiteMediano = 768; // Puedes ajustar este valor según tus necesidades

    // Verificar si el ancho de la pantalla es menor o igual al límite definido
    return screenWidth <= limiteMediano;
  }

  ObtenerMateria(hora: string, dia: string): string | null {
    if (this.srvHorario.horario.hasOwnProperty(dia) && this.srvHorario.horario[dia].hasOwnProperty(hora)) {
      return this.srvHorario.horario[dia][hora].materia;
    } else {
      return null;
    }
  }

  ObtenerColorMateria(hora: string, dia: string): string {
    const materia = this.ObtenerMateria(hora, dia);
    if (materia) {
      return this.srvHorario.horario[dia][hora].color;
    } else {
      return 'transparent';
    }
  }

  ObtenerAcronimoMateria(hora: string, dia: string): string {
    const materia = this.ObtenerMateria(hora, dia);
    if (materia) {
      return this.srvHorario.horario[dia][hora].acronimo;
    } else {
      return '';
    }
  }

  ObtenerIdMateria(hora: string, dia: string): number {
    const materia = this.ObtenerMateria(hora, dia);
    if (materia) {
      return this.srvHorario.horario[dia][hora].id;
    } else {
      return 0;
    }
  }

  openModal(hora: string, dia: string){
    // Implemenetamos el  servicio de modal para obtener el title
    if(this.mostrarContenido){
      this.srvModal.setTitleModal("Editar Horario");
      console.log("openModal");
      const idMateria = this.ObtenerIdMateria(hora, dia)
      this.srvMateria.setIdMateria(idMateria);
      this.srvHorario.setDia(dia);
      this.srvHorario.setHora(hora);
      this.srvHorario.setIdHorario(0);


      this.dialog.open(ModalComponent,{
        width: '40%',
        height: '50%'
      });
    }
  }

  toggleTooltip() {
    if(this.mostrarContenido){
      this.mostrarContenido = false;
    }else{
      this.mostrarContenido = true;
    }
    // this.tooltipInitialized = true;
    // this.display = !this.display;
    // const buttonRect = document.querySelector('button.secondary')!.getBoundingClientRect();
    // this.left = buttonRect.left + buttonRect.width;
    // this.top = buttonRect.top;
  }

  obtenerHorario(){
    this.srvHorario.getHorarioUser(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (homero: ModelShowHorario)=>{
        // this.srvHorario.transfor(horario, this.srvHorario.horario)
        // this.srvHorario.horario = homero;
        // transfor(){
          console.log("transformando");
          console.log("Horario de homero =>", homero);
          this.homero = homero.body;
          console.log("Homero pase al local =>", this.homero);
          // this.homero = homero.body;
          // homero.body.forEach(obj => {
          //   const dia = obj.dia.toLowerCase();
          //   const horaInicio = `${obj.hora_inicio.hour}:${obj.hora_inicio.minute}`;
          //   const horaFin = `${obj.hora_fin.hour}:${obj.hora_fin.minute}`;
          
          //   if (!this.srvHorario.horario[dia]) {
          //     this.srvHorario.horario[dia] = {}; // Crea el objeto para el día si no existe
          //   }
          
          //   if (!this.srvHorario.horario[dia][horaInicio]) {
          //     this.srvHorario.horario[dia][horaInicio] = {} as HorarioItem ; // Crea el objeto para la hora si no existe
          //   }
          
          //   this.srvHorario.horario[dia][horaInicio] = {
          //     materia: obj.nombre,
          //     horaFin: horaFin,
          //     color: obj.materiaColor,
          //     acronimo: obj.materiaAcro,
          //     id: obj.id
          //   };
          // });
          // console.log(this.srvHorario.horario);
        // }
        // const dataHorario : Horario = {};
        // const data = this.srvHorario.transfor(homero.body, dataHorario);
        // console.log("Horario transformado =>", data);
      }
    })
  }
  mostrarContenido = false;

  // ------------------------ Transformar datos ------------------------

 
}
