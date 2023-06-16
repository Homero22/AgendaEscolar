import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from 'src/app/core/services/materia.service';
import Swal from 'sweetalert2';

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


 idUser: any;

  constructor(
    private fb: FormBuilder,
    private srvMateria: MateriaService
  ) {
    this.myForm = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")]
      ],
      materiaAcro: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{3}$/)
        ]
      ],
      materiaColor: [
        '',
       [ Validators.pattern(/^#[0-9A-F]{6}$/i)]
      ],
      profesorNombre: [
        '',
        [Validators.required,
        Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")
        ]
      ],
    });
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
    console.log("idUser =>",this.idUser);
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

    const sendMateriaData = this.myForm.value;

    Swal.fire({
      title:'Esta seguro de añadir esta Materia?',
      showDenyButton:true,
      confirmButtonText:'Agregar',
      denyButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvMateria.postMateria(sendMateriaData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data)=>{
            if(data.status){
              Swal.fire({
                title:'Materia agregada con éxito!',
                icon:'success',
                showConfirmButton: false,
                timer: 1500
              })
              console.log("Materia agregada con éxito =>",data);
            }else{
              Swal.fire({
                title:'Error al agregar Materia!',
                icon:'error',
                showConfirmButton: false,
                timer: 1500
              })
              console.log("Error al agregar proveedor =>", data);
            }
            setTimeout(() => {
              Swal.close();
            }, 3000);
          },
          error: (error)=>{
            Swal.fire({
              title:'Error al agregar Materia!',
              icon:'error',
              showConfirmButton: false,
              timer: 1500
            })
            console.log("Error al agregar proveedor =>", error);
          },
          complete: ()=>{
            console.log("Petición completa!");
            this.myForm.reset();
          }
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
