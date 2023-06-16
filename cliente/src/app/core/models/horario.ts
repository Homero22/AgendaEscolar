export interface HorarioItem {
    materia: string;
    horaFin: string;
    color: string;
    acronimo: string;
    id: number;
  }
  
 export interface HorarioDia {
    [hora: string]: HorarioItem;
  }
  
 export interface Horario {
    lunes: HorarioDia;
    martes: HorarioDia;
    miércoles: HorarioDia;
    jueves: HorarioDia;
    viernes: HorarioDia;
  }
  
  export interface HomeroItem {
    id: number;
    idMateria: number;
    idUser: number;
    hora_inicio: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    hora_fin: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    dia: string;
    nombre: string;
    materiaAcro: string;
    materiaColor: string;
    profesorNombre: string;
  }
  