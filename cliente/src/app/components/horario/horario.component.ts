import {  Component, HostListener, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { HorarioService } from 'src/app/core/services/horario.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { Subject, takeUntil } from 'rxjs';
import { Horario, ModelShowHorario } from 'src/app/core/models/horario';
import Swal from 'sweetalert2';

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

  // horario: Horario = {};
  // homero!: any;

  private destroy$ = new Subject<any>();

  constructor(
    private srvModal: ModalService,
    private dialog: MatDialog,
    public srvHorario: HorarioService,
    public srvMateria: MateriaService

  ) {
    this.idUser =  sessionStorage.getItem('id');
    this.idUser = parseInt(this.idUser);
    console.log("id user =>", this.idUser);
    this.pantallaMediana = this.calcularPantallaMediana();
    this.obtenerHorario();

  }

  ngOnInit() {

    
    
  }

  ngAfterViewInit(){
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
      return this.srvHorario.horario[dia][hora].idMateria;
    } else {
      return -1;
    }
  }

  ObtenerIdHorario(hora: string, dia: string): number {
    const materia = this.ObtenerMateria(hora, dia);
    if (materia) {
      return this.srvHorario.horario[dia][hora].id;
    } else {
      return -1;
    }
  }

  openModal(hora: string, dia: string){
    // Implemenetamos el  servicio de modal para obtener el title
    if(this.mostrarContenido){
      this.srvModal.setTitleModal("Editar Horario");
      console.log("openModal");
      const idMateria = this.ObtenerIdMateria(hora, dia)
      const idHorario = this.ObtenerIdHorario(hora, dia)
      this.srvMateria.setIdMateria(idMateria);
      this.srvHorario.setDia(dia);
      this.srvHorario.setHora(hora);
      this.srvHorario.setIdHorario(idHorario);


      this.dialog.open(ModalComponent,{
        width: '40%',
        height: 'auto'
      });
    }
  }

  toggleTooltip() {
    if(this.mostrarContenido){
      this.mostrarContenido = false;
    }else{
      this.mostrarContenido = true;
    }
    this.tooltipInitialized = true;
    this.display = !this.display;
    const buttonRect = document.querySelector('button.secondary')!.getBoundingClientRect();
    this.left = buttonRect.left + buttonRect.width;
    this.top = buttonRect.top;
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
        this.srvHorario.dataHorario = homero.body;
          console.log("Horario de homero =>", homero);
          // this.srvHorario.dataorario = this.srvHorario.transfor(homero.body, this.srvHorario.horario)
          this.transf();
          console.log("Horario transdormado en horario=>", this.srvHorario.horario);
          Swal.close();
      }
    })
  }
  mostrarContenido = false;

  // ------------------------ Transformar datos ------------------------

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
  
  // console.log(JSON.stringify(horario, null, 2));

  
}
