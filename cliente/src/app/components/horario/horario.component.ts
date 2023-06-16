import { Time } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-horario',
  // template: '<ejs-schedule></ejs-schedule>',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent {

  pantallaMediana: boolean;
  calendarVisible = true;
  // calendarOptions: CalendarOptions = {
  //   plugins: [
  //     interactionPlugin,
  //     dayGridPlugin,
  //     timeGridPlugin,
  //     listPlugin,
  //   ],


  horas: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00']; // Horas del horario
  dias: string[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']; // Días del horario
  horario: any = {
    lunes: {
      '8:00': { materia: 'Matemáticas', horaFin: '9:00', color: '#008000', acronimo: 'MAT' },
      '9:00': { materia: 'Historia', horaFin: '10:00', color: 'rojo', acronimo: 'HIS' },
      '10:00': { materia: 'Inglés', horaFin: '11:00', color: 'verde', acronimo: 'ING' },
      '11:00': { materia: 'Educación Física', horaFin: '12:00', color: 'amarillo', acronimo: 'EDF' },
      '12:00': { materia: 'Artes', horaFin: '13:00', color: 'naranja', acronimo: 'ART' }
    },
    martes: {
      '8:00': { materia: 'Ciencias', horaFin: '9:00', color: 'verde', acronimo: 'CIE' },
      '9:00': { materia: 'Lengua y Literatura', horaFin: '10:00', color: '#008000', acronimo: 'LEN' },
      '10:00': { materia: 'Matemáticas', horaFin: '11:00', color: 'rojo', acronimo: 'MAT' },
      '11:00': { materia: 'Ciencias Sociales', horaFin: '12:00', color: 'naranja', acronimo: 'CS' },
      '12:00': { materia: 'Música', horaFin: '13:00', color: 'amarillo', acronimo: 'MUS' }
    },
    miércoles: {
      '8:00': { materia: 'Inglés', horaFin: '9:00', color: 'verde', acronimo: 'ING' },
      '9:00': { materia: 'Educación Física', horaFin: '10:00', color: 'amarillo', acronimo: 'EDF' },
      '10:00': { materia: 'Lengua y Literatura', horaFin: '11:00', color: '#008000', acronimo: 'LEN' },
      '11:00': { materia: 'Ciencias', horaFin: '12:00', color: 'rojo', acronimo: 'CIE' },
      '12:00': { materia: 'Matemáticas', horaFin: '13:00', color: 'naranja', acronimo: 'MAT' }
    },
    jueves: {
      '8:00': { materia: 'Historia', horaFin: '9:00', color: 'rojo', acronimo: 'HIS' },
      '9:00': { materia: 'Música', horaFin: '10:00', color: '#008000', acronimo: 'MUS' },
      '10:00': { materia: 'Ciencias Sociales', horaFin: '11:00', color: 'naranja', acronimo: 'CS' },
      '11:00': { materia: 'Lengua y Literatura', horaFin: '12:00', color: 'azul', acronimo: 'LEN' },
      '12:00': { materia: 'Educación Física', horaFin: '13:00', color: 'verde', acronimo: 'EDF' }
    },
    viernes: {
      '8:00': { materia: 'Artes', horaFin: '9:00', color: '#ccc', acronimo: 'ART' },
      '9:00': { materia: 'Ciencias', horaFin: '10:00', color: 'rojo', acronimo: 'CIE' },
      '10:00': { materia: 'Matemáticas', horaFin: '11:00', color: '#008000', acronimo: 'MAT' },
      '11:00': { materia: 'Inglés', horaFin: '12:00', color: '#008000', acronimo: 'ING' },
      '12:00': { materia: 'Ciencias Sociales', horaFin: '13:00', color: 'amarillo', acronimo: 'CS' }
    }
  };
  constructor() {     this.pantallaMediana = this.calcularPantallaMediana();
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
    if (this.horario.hasOwnProperty(dia) && this.horario[dia].hasOwnProperty(hora)) {
      return this.horario[dia][hora].materia;
    } else {
      return null;
    }
  }

  ObtenerColorMateria(hora: string, dia: string): string {
    const materia = this.ObtenerMateria(hora, dia);
    if (materia) {
      return this.horario[dia][hora].color;
    } else {
      return 'transparent';
    }
  }

  ObtenerAcronimoMateria(hora: string, dia: string): string {
    const materia = this.ObtenerMateria(hora, dia);
    if (materia) {
      return this.horario[dia][hora].acronimo;
    } else {
      return '';
    }
  }


}
