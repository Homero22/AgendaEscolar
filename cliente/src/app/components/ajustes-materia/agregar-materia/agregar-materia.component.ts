import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css']
})
export class AgregarMateriaComponent implements OnInit {
  @ViewChild('inputColor') inputColor!: string;

  private destroy$ = new Subject<any>();

  //creamos el formulario myForm
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
      materia: ['', Validators.required],
      acronimo: ['', Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
      color: ['', Validators.required, Validators.pattern(/^#[0-9A-F]{6}$/i)],
      profesor: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }


  //codigo para la peleta de colores
  selectedColor!: string;

  getColor(event: any) {
    this.selectedColor = event.target.value;
    console.log(this.selectedColor);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
