export interface Task {
    id: number;
    idUser: number;
    idMateria: number;
    tareaTitulo: string;
    tareaDescripcion: string;
    fechaCreacion: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    fechaFin: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    tareaEstado: string;
    tareaRecordatorio: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
  }

  
export interface ModelTask {

    body: Task[];
    status: string;
    message: string;
    }