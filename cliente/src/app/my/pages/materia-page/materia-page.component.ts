import { Component } from '@angular/core';
import { MateriaService } from 'src/app/core/services/materia.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-materia-page',
  templateUrl: './materia-page.component.html',
  styleUrls: [
    './materia-page.component.css'
  ]

})
export class MateriaPageComponent {

  //LOGICA DE LA PAGINA
  nombre ="APRENDIENDO HTML- CSS- TS";
  nombres: string[] = ['CIENCIAS', 'MATEMATICAS', 'FUNDAMENTOS DE PROGRAMACIÓN y algo mas java c xd ciencias ','CIENCIAS', 'MATEMATICAS', 'FUNDAMENTOS DE PROGRAMACIÓN','CIENCIAS', 'MATEMATICAS', 'FUNDAMENTOS DE PROGRAMACIÓN','CIENCIAS', 'MATEMATICAS', 'FUNDAMENTOS DE PROGRAMACIÓN'];


  //SERVICIOS
  destroy$ = new Subject<any>();
    constructor(
      private srvMateria: MateriaService,

    ) { 

    }

    ngOnInit(): void {
      console.log("ngOnInit");
      this.getMaterias();
    }

    getMaterias(){
      this.srvMateria.getMaterias()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(materiaData)=>{
          console.log("Informacion de Obtener Materias",materiaData);
        }
      
      });
    }

    




}


