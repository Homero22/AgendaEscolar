import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { Chart } from 'chart.js'; 
import { takeUntil, Subject } from 'rxjs';
import { InicioAdminService } from 'src/app/core/services/inicio-admin.service';
import Chart from 'chart.js/auto';

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

  ngOnInit(): void {
    this.getNumCard();
    this.getDatosGrafico();
    // this.crearbarchart();

  }

  ngAfterViewInit() {
    // if (this.srvInicioAdmin.datos) {
    //   console.log("existe datos")
    //   setTimeout(() => {
    //     this.createBarChart();
    //   }, 100);
    // }
    // this.crearbarchart();
  }
  

  getDatosGrafico(){
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
    // this.createBarChart();
    // this.crearbarchart();


}

getcontenido(anio: number){
  this.srvInicioAdmin.getUserXMes(anio)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (value) =>{
          console.log("datos del gráfico ",value)
          this.srvInicioAdmin.datos = value.body
          this.crearbarchart()
      },
    })
}

createBarChart() {
/*
  const labels = this.srvInicioAdmin.datos.map(dato => dato.mes);
  const valores = this.srvInicioAdmin.datos.map(dato => dato.cantidad);

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
  */
  const datos = [
  { mes: 'Junio', cantidad: 7 },
  { mes: 'Julio', cantidad: 3 }
];

const chartContainer = document.querySelector('.chart-container');
const chartBar = document.querySelector('.chart-bar');

const maxValor = Math.max(...datos.map(dato => dato.cantidad));

datos.forEach(dato => {
  const porcentaje = (dato.cantidad / maxValor) * 100;
  const barra = document.createElement('div');
  barra.classList.add('barra');
  barra.style.height = porcentaje + '%';
  barra.innerText = dato.cantidad.toString();
  chartBar?.appendChild(barra);
});

}


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

crearbarchart() {
  console.log("entro a createBarChart");

  const canvas = document.getElementById('myChart') as HTMLCanvasElement;
  console.log("canvas ", canvas);

  if (canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    console.log("ctx ", ctx);

    if (ctx) {
      // Obtener todos los nombres de los meses
      const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];

      // Generar el conjunto completo de etiquetas y valores
      const labels = meses;
      const valores = meses.map(mes => {
        const dato = this.srvInicioAdmin.datos.find(d => d.mes === mes);
        return dato ? dato.cantidad : 0;
      });

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'N° Usuarios',
            data: valores,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  } else {
    console.error("No se encontró el elemento canvas con el ID 'myChart'");
  }
}



}