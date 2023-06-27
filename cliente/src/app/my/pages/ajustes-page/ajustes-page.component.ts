import { Component } from '@angular/core';

@Component({
  selector: 'app-ajustes-page',
  templateUrl: './ajustes-page.component.html',
  styleUrls: [ './ajustes-page.component.css'
  ]
})
export class AjustesPageComponent {

  constructor() { }
  paisSeleccionado: { nombre: string, usuarios: number } | null = null;

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
      usuarios: 15,
      acronimo: 'CO',
    },
    {
      id: 3,
      nombre: 'Peru',
      usuarios: 35,
      acronimo: 'PE',
    },
    {
      id: 4,
      nombre: 'Venezuela',
      usuarios: 25,
      acronimo: 'VE',
    },
  ]

  ngOnInit(): void {
    setTimeout(() => {
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
    }, 100);
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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    document.getElementById('EC')?.setAttribute('fill', 'red')

  }

  changeColor(id: string){
    document.getElementById(id)?.setAttribute('fill', 'red')
  }

}
