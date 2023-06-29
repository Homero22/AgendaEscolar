import { Component } from '@angular/core';
import { ReportesService } from 'src/app/core/services/reportes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IReporte } from 'src/app/core/models/reportes';

@Component({
  selector: 'app-reportes-page',
  templateUrl: './reportes-page.component.html',
  styleUrls: ['./reportes-page.component.css']
})
export class ReportesPageComponent {

  constructor(
    public srvReportes: ReportesService
  ) {
    this.getCountriesUsers();
   }

   paisSeleccionado: IReporte | null = null;
   private destroy$ = new Subject<any>();

  getCountriesUsers(){
    this.srvReportes.getUsuariosPais()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.srvReportes.datos = data.body;
        console.log("Datos llegados de Homero ",this.srvReportes.datos);
        this.actualizarColores();
        this.registrarEventos();
      }
    })
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

private async actualizarColores(): Promise<void> {
  await this.waitForData(); // Esperar hasta que los datos estén disponibles
  if (!this.srvReportes.datos) {
    console.log("No hay datos");
  }

  const maxUsuarios = Math.max(...this.srvReportes.datos.map(dato => dato.cantidad));
  const minUsuarios = Math.min(...this.srvReportes.datos.map(dato => dato.cantidad));

  for (const dato of this.srvReportes.datos) {
    const paths = document.querySelectorAll(`[id="${dato.acronimo}"]`);
    paths.forEach((path: Element) => {
      const intensidad = this.calcularIntensidad(dato.cantidad, minUsuarios, maxUsuarios);
      const color = this.calcularColor(intensidad);
      (path as HTMLElement).style.fill = color;
    });
  }
}

private async registrarEventos(): Promise<void> {
  await this.waitForData(); // Esperar hasta que los datos estén disponibles

  const svg = document.getElementById('mapa');
  const paths = svg?.querySelectorAll('path[id]');

  for (const dato of this.srvReportes.datos) {
    const paths = document.querySelectorAll(`[id="${dato.acronimo}"]`);
    paths.forEach((path: Element) => {
      path.addEventListener('mouseenter', () => {
        this.mostrarInfoPais(dato);
      });

      path.addEventListener('mouseleave', () => {
        this.ocultarInfoPais();
      });
    });
  }
}




calcularIntensidad(usuarios: number, minUsuarios: number, maxUsuarios: number): number {
  const porcentaje = (usuarios - minUsuarios) / (maxUsuarios - minUsuarios);
  return Math.round(porcentaje * 100);
}

calcularColor(intensidad: number): string {
  const color = Math.round(250 - intensidad * 2.55);
  console.log("Color =>", color);
  return `rgb(0, 0, ${color})`;
}

mostrarInfoPais(pais: IReporte): void {
  // console.log("Pais seleccionado =>", pais);
  this.paisSeleccionado = pais;
}

ocultarInfoPais(): void {
  this.paisSeleccionado = null;
}

  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
