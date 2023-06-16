import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { Horario,  } from '../models/horario';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private urlApi_Materias: string = config.URL_API_BASE + "schedules";
  constructor(private http: HttpClient) { }

  // ------------------------ HORARIO BEHAVIORSUBJECTS ------------------------

  //behaviorSubject para obtener la hora y el dia
  private hora$ = new BehaviorSubject<string>('');
  private dia$ = new BehaviorSubject<string>('');

  get selectHora$(): Observable<string>{
    return this.hora$.asObservable();
  }

  get selectDia$(): Observable<string>{
    return this.dia$.asObservable();
  }

  setHora(_hora: string){
    this.hora$.next(_hora);
  }

  setDia(_dia: string){
    this.dia$.next(_dia);
  }

  // ------------------------ HORARIO ------------------------

  horas: string[] = ["7:00",'8:00', '9:00', '10:00', '11:00', '12:00']; // Horas del horario
  dias: string[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']; // Días del horario
  horario: Horario = {
    lunes: {
      '8:00': { materia: 'Matemáticas', horaFin: '9:00', color: '#008000', acronimo: 'MAT', id: 1 },
      '9:00': { materia: 'Historia', horaFin: '10:00', color: 'rojo', acronimo: 'HIS',id: 2 },
      '10:00': { materia: 'Inglés', horaFin: '11:00', color: 'verde', acronimo: 'ING',id: 3 },
      '11:00': { materia: 'Educación Física', horaFin: '12:00', color: 'amarillo', acronimo: 'EDF',id: 4 },
      '12:00': { materia: 'Artes', horaFin: '13:00', color: 'naranja', acronimo: 'ART',id: 5 }
    },
    martes: {
      '8:00': { materia: 'Ciencias', horaFin: '9:00', color: 'verde', acronimo: 'CIE', id:6 },
      '9:00': { materia: 'Lengua y Literatura', horaFin: '10:00', color: '#008000', acronimo: 'LEN', id:7 },
      '10:00': { materia: 'Matemáticas', horaFin: '11:00', color: 'rojo', acronimo: 'MAT', id:1 },
      '11:00': { materia: 'Ciencias Sociales', horaFin: '12:00', color: 'naranja', acronimo: 'CS', id:8 },
      '12:00': { materia: 'Música', horaFin: '13:00', color: 'amarillo', acronimo: 'MUS', id:9 }
    },
    miércoles: {
      '8:00': { materia: 'Inglés', horaFin: '9:00', color: 'verde', acronimo: 'ING', id:3 },
      '9:00': { materia: 'Educación Física', horaFin: '10:00', color: 'amarillo', acronimo: 'EDF', id:4 },
      '10:00': { materia: 'Lengua y Literatura', horaFin: '11:00', color: '#008000', acronimo: 'LEN', id:7 },
      '11:00': { materia: 'Ciencias', horaFin: '12:00', color: 'rojo', acronimo: 'CIE', id:6 },
      '12:00': { materia: 'Matemáticas', horaFin: '13:00', color: 'naranja', acronimo: 'MAT', id:1 }
    },
    jueves: {
      '8:00': { materia: 'Historia', horaFin: '9:00', color: 'rojo', acronimo: 'HIS', id:2 },
      '9:00': { materia: 'Música', horaFin: '10:00', color: '#008000', acronimo: 'MUS', id:9 },
      '10:00': { materia: 'Ciencias Sociales', horaFin: '11:00', color: 'naranja', acronimo: 'CS', id:8 },
      '11:00': { materia: 'Lengua y Literatura', horaFin: '12:00', color: 'azul', acronimo: 'LEN', id:7 },
      '12:00': { materia: 'Educación Física', horaFin: '13:00', color: 'verde', acronimo: 'EDF', id:4 }
    },
    viernes: {
      '8:00': { materia: 'Artes', horaFin: '9:00', color: '#ccc', acronimo: 'ART', id:5 },
      '9:00': { materia: 'Ciencias', horaFin: '10:00', color: 'rojo', acronimo: 'CIE', id:6 },
      '10:00': { materia: 'Matemáticas', horaFin: '11:00', color: '#008000', acronimo: 'MAT', id:1 },
      '11:00': { materia: 'Inglés', horaFin: '12:00', color: '#008000', acronimo: 'ING', id:3  },
      '12:00': { materia: 'Ciencias Sociales', horaFin: '13:00', color: 'amarillo', acronimo: 'CS', id:8 }
    }};
}
