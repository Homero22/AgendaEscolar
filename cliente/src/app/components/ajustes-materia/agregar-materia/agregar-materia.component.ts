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
      materia: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")]
      ],
      acronimo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{3}$/)
        ]
      ],
      color: [
        '',
       [ Validators.pattern(/^#[0-9A-F]{6}$/i)]
      ],
      profesor: [
        '',
        [Validators.required,
        Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")
        ]
      ],
    });
  }

  ngOnInit(): void {

  }


  //codigo para la peleta de colores
  selectedColor: string = '#000000';

  getColor(event: any) {
    this.selectedColor = event.target.value;
    console.log(this.selectedColor);
    this.myForm.get('color')?.setValue(this.selectedColor);
  }


  saveMateria(){
    console.log("Valor que llega al Form de Materia =>",this.myForm.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
