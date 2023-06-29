import { Component } from '@angular/core';
import { ReportesService } from 'src/app/core/services/reportes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

  paisSeleccionado: { nombre: string, usuarios: number } | null = null;
  private destroy$ = new Subject<any>();

  getCountriesUsers(){
    this.srvReportes.getUsuariosPais()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.srvReportes.datos = data.body;
        console.log("Datos llegados de Homero ",this.srvReportes.datos);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
