import {  Component, HostListener, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { HorarioService } from 'src/app/core/services/horario.service';
import { MateriaService } from 'src/app/core/services/materia.service';

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

  constructor(
    private srvModal: ModalService,
    private dialog: MatDialog,
    public srvHorario: HorarioService,
    public srvMateria: MateriaService

  ) {
    this.pantallaMediana = this.calcularPantallaMediana();

  }

  ngOnInit() {
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

  mostrarContenido = false;
}
