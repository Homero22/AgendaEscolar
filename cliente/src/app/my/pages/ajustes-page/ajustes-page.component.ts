import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ReportesService } from 'src/app/core/services/reportes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IReporte } from 'src/app/core/models/reportes';

@Component({
  selector: 'app-ajustes-page',
  templateUrl: './ajustes-page.component.html',
  styleUrls: [ './ajustes-page.component.css'
  ]
})
export class AjustesPageComponent {
  // @ViewChild('tooltipContent') tooltipContent: TemplateRef<any>;
  tooltipText: string | undefined;
  private destroy$ = new Subject<any>();

  constructor(
    private srvReportes: ReportesService
  ) { }
  paisSeleccionado: { nombre: string, usuarios: number } | null = null;

  // datos!: IReporte[];

  datos = [
    {
      id: 1,
      nombre: 'Ecuador',
      usuarios: 6,
      acronimo: 'EC',
    },
    {
      id: 2,
      nombre: 'Colombia',
      usuarios: 1,
      acronimo: 'CO',
    },
    {
      id: 3,
      nombre: 'Peru',
      usuarios:1,
      acronimo: 'PE',
    },
    // {
    //   id: 4,
    //   nombre: 'Venezuela',
    //   usuarios: 25,
    //   acronimo: 'VE',
    // },
  ]

  ngOnInit(): void {
    this.getUsuariosPais();
    setTimeout(() => {
      this.ini();
    }
    , 100);
  
  }

  ini(){
      // setTimeout(() => {
        const svg = document.getElementById('mapa');
        const paths = svg?.getElementsByTagName('path');
  
        const maxUsuarios = Math.max(...this.datos.map(dato => dato.usuarios));
        const minUsuarios = Math.min(...this.datos.map(dato => dato.usuarios));
  
        for (const dato of this.datos) {
          const path = document.getElementById(dato.acronimo);
  
          path?.addEventListener('mouseenter', () => {
            this.mostrarInfoPais(dato);
          });
  
          path?.addEventListener('mouseleave', () => {
            this.ocultarInfoPais();
          });
  
          // Calcula el color basado en la cantidad de usuarios
          const intensidad = this.calcularIntensidad(dato.usuarios, minUsuarios, maxUsuarios);
          const color = this.calcularColor(intensidad);
  
          // Aplica el color al elemento <path>
          if (path) {
            path.style.fill = color;
          }
        }
      // }, 5000);
  }

  calcularIntensidad(usuarios: number, minUsuarios: number, maxUsuarios: number): number {
    const porcentaje = (usuarios - minUsuarios) / (maxUsuarios - minUsuarios);
    return Math.round(porcentaje * 90);
  }

  calcularColor(intensidad: number): string {
    const color = Math.round(250 - intensidad * 2.55);
    return `rgb(0, 0, ${color})`;
  }

  mostrarInfoPais(pais: { nombre: string, usuarios: number }): void {
    this.paisSeleccionado = pais;
  }

  ocultarInfoPais(): void {
    this.paisSeleccionado = null;
  }

  getUsuariosPais(){
    this.srvReportes.getUsuariosPais()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(reporteData)=>{
        if(reporteData.body){
          this.srvReportes.datos = reporteData.body;
          // console.log("Valor de datos =>",this.srvReportes.datos);
          // this.datos = this.srvReportes.datos;
          console.log("Valor de srvReportes.datos =>", this.srvReportes.datos);
          console.log("Valor de datos =>", this.datos);
          this.ini();
        }else{
          console.log("No hay datos");
        }
      }
    });
  }

  mostrarTooltip(pais: any, event: MouseEvent): void {
    const container = document.getElementById('mapa-container');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const tooltipLeft = event.clientX - containerRect.left + window.pageXOffset;
      const tooltipTop = event.clientY - containerRect.top + window.pageYOffset;

      this.tooltipText = `Nombre: ${pais.nombre} \nUsuarios: ${pais.usuarios}`;
      container.style.setProperty('--tooltip-left', `${tooltipLeft}px`);
      container.style.setProperty('--tooltip-top', `${tooltipTop}px`);
    }
  }

  ocultarTooltip(): void {
    this.tooltipText = undefined;
  }
  
/*
  ngOnInit(): void {
  this.getUsuariosPais();
  // setTimeout(() => {
  //   this.actualizarColores();
  //   this.registrarEventos();
  // }, 100);
}

private async actualizarColores(): Promise<void> {
  await this.waitForData(); // Esperar hasta que los datos estén disponibles
  if (!this.srvReportes.datos) {
    console.log("No hay datos");
  }

  const maxUsuarios = Math.max(...this.srvReportes.datos.map(dato => dato.usuarios));
  const minUsuarios = Math.min(...this.srvReportes.datos.map(dato => dato.usuarios));

  for (const dato of this.srvReportes.datos) {
    const path = document.getElementById(dato.acronimo);
    if (path) {
      const intensidad = this.calcularIntensidad(dato.usuarios, minUsuarios, maxUsuarios);
      const color = this.calcularColor(intensidad);
      path.style.fill = color;
    }
  }
}

private waitForData(): Promise<void> {
  return new Promise<void>((resolve) => {
    const intervalId = setInterval(() => {
      if (this.srvReportes.datos) {
        clearInterval(intervalId);
        resolve();
      }
    }, 100);
  });
}


private async registrarEventos(): Promise<void> {
  await this.waitForData(); // Esperar hasta que los datos estén disponibles

  const svg = document.getElementById('mapa');
  const paths = svg?.getElementsByTagName('path');

  for (const dato of this.srvReportes.datos) {
    const path = document.getElementById(dato.acronimo);
    if (path) {
      path.addEventListener('mouseenter', () => {
        this.mostrarInfoPais(dato);
      });

      path.addEventListener('mouseleave', () => {
        this.ocultarInfoPais();
      });
    }
  }
}



calcularIntensidad(usuarios: number, minUsuarios: number, maxUsuarios: number): number {
  const porcentaje = (usuarios - minUsuarios) / (maxUsuarios - minUsuarios);
  return Math.round(porcentaje * 100);
}

calcularColor(intensidad: number): string {
  const color = Math.round(255 - intensidad * 2.55);
  return `rgb(0, 0, ${color})`;
}

mostrarInfoPais(pais: { nombre: string, usuarios: number }): void {
  this.paisSeleccionado = pais;
}

ocultarInfoPais(): void {
  this.paisSeleccionado = null;
}

getUsuariosPais(): void {
  this.srvReportes.getUsuariosPais()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (reporteData) => {
        if (reporteData.body) {
          this.srvReportes.datos = reporteData.body;
          console.log("Valor de srvReportes.datos =>", this.srvReportes.datos);
          this.actualizarColores();
          this.registrarEventos();
        } else {
          console.log("No hay datos");
        }
      }
    });
}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.destroy$.next({});
  this.destroy$.complete();
}
*/

}
