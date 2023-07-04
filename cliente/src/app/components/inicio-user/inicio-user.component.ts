import { Component } from '@angular/core';
import { HorarioService } from 'src/app/core/services/horario.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { Subject, takeUntil } from 'rxjs';
import { Horario, ModelShowHorario } from 'src/app/core/models/horario';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inicio-user',
  templateUrl: './inicio-user.component.html',
  styleUrls: ['./inicio-user.component.css']
})
export class InicioUserComponent {

  private destroy$ = new Subject<any>();

  pantallaMediana!: boolean;
  calendarVisible = true;
  display = false;
  left = 0;
  top = 0;
  tooltipInitialized = false;
  idUser: any;

  constructor(
    public srvHorario: HorarioService,
    public srvMateria: MateriaService
  ){

    this.idUser =  sessionStorage.getItem('id');
    this.idUser = parseInt(this.idUser);
    console.log("id user =>", this.idUser);
    this.pantallaMediana = this.calcularPantallaMediana();
    this.obtenerHorario();
  }

  calcularPantallaMediana(): boolean {
    // Obtener el ancho de la pantalla
    const screenWidth = window.innerWidth;

    // Definir el ancho límite para considerar una pantalla como mediana
    const limiteMediano = 768; // Puedes ajustar este valor según tus necesidades

    // Verificar si el ancho de la pantalla es menor o igual al límite definido
    return screenWidth <= limiteMediano;
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
  mostrarContenido = false;


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

  getDiaHoy(): string {
    const fecha = new Date();
    const dia = fecha.getDay();
    switch (dia) {
      case 0:
        return 'DOMINGO';
      case 1:
        return 'LUNES';
      case 2:
        return 'MARTES';
      case 3:
        return 'MIERCOLES';
      case 4:
        return 'JUEVES';
      case 5:
        return 'VIERNES';
      case 6:
        return 'SABADO';
      default:


        return '';
    }
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next({});
    this.destroy$.complete();
  }


}
