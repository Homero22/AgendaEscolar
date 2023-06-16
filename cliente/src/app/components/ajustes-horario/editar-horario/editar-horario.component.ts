import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.css'],
  
})
export class EditarHorarioComponent {

  materiaForm!: FormGroup;
  materia!: FormControl;
  selected = 'option2';
  idMateria: any;

  constructor(
    public fb: FormBuilder,
    public srvModal: ModalService
  ) {
    this.materia = new FormControl('', [Validators.required]);
    this.materiaForm = this.fb.group({
      materia: this.materia,
      acronimo: ['', Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
      color: ['', Validators.required, Validators.pattern(/^#[0-9A-F]{6}$/i)]
    });

  }

  ngOnInit(): void {
    this.idMateria = this.srvModal.selectIdMateria$;

    console.log("idMeria", this.idMateria);
    
  }

  submitForm() {
    if (this.materiaForm.valid) {
      const formData = this.materiaForm.value;
      console.log(formData);
    }else{
      this.getErrorMessage();
    }
  }

  getErrorMessage() {
    if (this.materiaForm.get('acronimo')?.hasError('required')) {
      return 'Debe ingresar un acrónimo';
    }

    return this.materiaForm.get('acronimo')?.hasError('pattern') ? 'Acrónimo ingresado no válido' : '';
  }

  //obtener la sekccion de la materia
  onSelectionChange(event: any) {
    console.log(this.selected);
  }




}
