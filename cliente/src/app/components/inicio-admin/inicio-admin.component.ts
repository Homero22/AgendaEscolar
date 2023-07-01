import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js'; 
import { takeUntil, Subject } from 'rxjs';
import { InicioAdminService } from 'src/app/core/services/inicio-admin.service';
// import * as Chart from 'chart.js';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent {
  @ViewChild('barChartCanvas', { static: false }) barChartCanvas?: ElementRef;

  private destroy$ = new Subject<any>();

  constructor(
    public srvInicioAdmin: InicioAdminService
  ){}

  chart=[]
  maxCantidad!: number
  minCantidad!: number
  meses: string[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getNumCard();
    this.getDatosGrafico();
    // this.createBarChart();

    // this.rangos();
   
  }

  // ngAfterViewInit() {
  //   if (this.barChartCanvas) {
  //     this.createBarChart();
  //   }
  // }

  getNumCard(){
    this.srvInicioAdmin.getUsersTotal()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res)=>{
        console.log("cantidad de usuarios ",res)
        this.srvInicioAdmin.usuariosT = res.body
      }
    })

    this.srvInicioAdmin.getMateriasTotales()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (value) =>{
          console.log("cantidad de materias ",value)
          this.srvInicioAdmin.materiasT = value.body
        },
    })

    this.srvInicioAdmin.getAdminTotales()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (value) =>{
          console.log("cantidad de administradores ",value)
          this.srvInicioAdmin.adminsT = value.body
      },
    })
  }

  getDatosGrafico(){
    // const anio = '2023'
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear(); 

    this.srvInicioAdmin.getAniosDisponible()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (value) =>{
          console.log("años disponibles ",value)
          this.srvInicioAdmin.anios = value.body
      },
    })

    this.getcontenido(anio)
    this.createBarChart();

}

getcontenido(anio: number){
  this.srvInicioAdmin.getUserXMes(anio)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (value) =>{
          console.log("datos del gráfico ",value)
          this.srvInicioAdmin.datos = value.body
      },
    })
}

rangos(){
  this.maxCantidad = Math.max(...this.srvInicioAdmin.datos.map(dato => dato.cantidad));
  this.minCantidad = Math.min(...this.srvInicioAdmin.datos.map(dato => dato.cantidad));

}

// createBarChart() {
//   // const datos = [
//   //   { mes: 'Junio', cantidad: 7 },
//   //   { mes: 'Julio', cantidad: 3 }
//   // ];

//   const labels = this.srvInicioAdmin.datos.map(dato => dato.mes);
//   const valores = this.srvInicioAdmin.datos.map(dato => dato.cantidad);

//   // const canvas: HTMLCanvasElement = document.getElementById('barChart') as HTMLCanvasElement;
//   // const ctx = canvas.getContext('2d');

//   const ctx = this.barChartCanvas?.nativeElement.getContext('2d');

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: 'Cantidad',
//         data: valores,
//         backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de las barras
//         borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
//         borderWidth: 1 // Grosor del borde de las barras
//       }]
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
// }

createBarChart() {
  const datos = [
    { mes: 'Junio', cantidad: 7 },
    { mes: 'Julio', cantidad: 3 }
  ];

  const labels = datos.map(dato => dato.mes);
  const valores = datos.map(dato => dato.cantidad);

  const ctx = this.barChartCanvas?.nativeElement.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cantidad',
        data: valores,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
}