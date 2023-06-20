
export interface HorarioItem {
    materia: string;
    horaFin: string;
    color: string;
    acronimo: string;
    id: number;
  }
 /* 
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
*/
  export interface Horario {
    [dia: string]: {
      [hora: string]: {
        materia: string;
        horaFin: string;
        color: string;
        acronimo: string;
        id: number;
        idMateria: number
      };
    };
  }
  
  
  export interface HomeroItem{
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
    nombreMateria: string;
    acronimo: string;
    color: string;
    profesorNombre: string;
  }
  
  export interface addDataHorario{
    id: number,
      idMateria: number,
      idUser: number,
      hora_inicio: string,
      hora_fin: string,
      dia: string,
  }

  export interface ModelAddHorario{
    status: string,
    message: string,
    body: addDataHorario
  }

  export interface ModelShowHorario{
    status: string,
    messege: string,
    body: HomeroItem[]
  }