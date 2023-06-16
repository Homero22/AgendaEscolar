import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css']
})
export class AgregarMateriaComponent implements OnInit {

  private destroy$ = new Subject<any>();

  constructor() { }

  ngOnInit(): void {

  }


  //codigo para la peleta de colores
  selectedColor!: string;

  getColor(color: any) {
    this.selectedColor = color;
    console.log(this.selectedColor);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
