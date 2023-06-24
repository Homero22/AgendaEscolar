import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-agregar-apunte',
  templateUrl: './agregar-apunte.component.html',
  styleUrls: ['./agregar-apunte.component.css']
})
export class AgregarApunteComponent implements OnInit {
 @ViewChild('textResume') textResumeRef!: ElementRef;




  private destroy$ = new Subject<any>();
  textControl: FormControl = new FormControl('');


  myForm!: FormGroup;
  close!: boolean;
  idUser: any;
  currentDate!: string;
  value_string_time: any;

  content: string = "";


  constructor(
    private fb: FormBuilder,
    private srvApuntes: ApunteService,
    private srvModal: ModalService,
    public srvMateria: MateriaService
  ) {
    this.myForm = this.fb.group({
      id:[
        0,
      ],
      idUser: [
        this.idUser,
      ],
      idMateria:[
        '',
        [
          Validators.required,
        ]
      ],
      apunteTitulo: [
        '',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")
        ]
      ],
      apunteTexto:[
        '',
        [
          Validators.required,
        ]
      ]
      ,
      apunteRecordatorio:[
        '',
        [
          Validators.required,
        ]

      ],
      fechaCreacion:[
        '',

      ]
    })
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
    console.log("idUser =>",this.idUser)
    this.myForm.get('idUser')?.setValue(this.idUser);
    console.log("Valor del idUser de mhyForm", this.myForm.get('idUser')?.value);
    this.currentDate = new Date().toISOString().slice(0, 10);
    console.log("valor de currentDate =>", this.currentDate);
    this.getMaterias();
  }

  ngAfterViewInit(){
    this.textResumeRef.nativeElement.textContent = this.myForm.get('apunteTexto')?.value;

    this.textResumeRef.nativeElement.addEventListener('input', () => {
      this.myForm.patchValue({ apunteTexto: this.textResumeRef.nativeElement.textContent });
    });
  }

  // Función para agregar el Apunte
  saveApunte(){
    //imprimimos en consola el valor de myform
    this.myForm.get('fechaCreacion')?.setValue(this.currentDate);
    console.log("Valor de MyForm =>", this.myForm.value);

    this.transformDate(this.myForm.get('fechaCreacion')?.value);


    console.log("Valor de MyForm =>", this.myForm.value);

    Swal.fire({
      title:'Esta seguro de añadir este Apunte?',
      showDenyButton:true,
      confirmButtonText:'Agregar',
      denyButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvApuntes.postApunte(this.myForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(apunteData)=>{
            console.log("Valor de apunteData =>",apunteData);
            if(apunteData.status){
              Swal.fire({
                icon:'success',
                title:'Apunte agregado correctamente',
                showConfirmButton:false,
                timer:1500
              });
              console.log("Apunte agregado correctamente =>",apunteData);
            }else{
              Swal.fire({
                icon:'error',
                title:apunteData.message,
                showConfirmButton:false,
                timer:1500
              });
              console.log("Error al agregar el apunte =>",apunteData);
            }
            setTimeout(() => {
              Swal.close();
            }, 3000);
          },
          error:(err)=>{
            Swal.fire({
              title:'Error al agregar Apunte!',
              icon:'error',
              showConfirmButton: false,
              timer: 1500
            })
            console.log("Error al agregar materia =>", err);
          },
          complete:()=>{
            console.log("Peticion finalizada");
            this.srvModal.setCloseMatDialog(true);
            this.myForm.reset();
          }
        });
      }
    });

  }

  transformDate(dateFin: Date){
    const datePipe = new DatePipe('en-US');
    const fechaFormateada = datePipe.transform(dateFin, 'yyyy-MM-dd');
    this.myForm.get('fechaFin')?.setValue(fechaFormateada);
    console.log(fechaFormateada); // Resultado: "2023/06/25"
  }

  // Funcion para obtener las materias del usuario
  getMaterias(){
    this.srvMateria.getMateriasUsuario(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(materiaData)=>{
        if(materiaData.body){
          this.srvMateria.datosMateria = materiaData.body;
          console.log("Valor de materiaData.body =>",this.srvMateria.datosMateria);
        }else{
          console.log("No hay datos");
        }
      },
      error:(err)=>{
        console.log("Error en la peticion =>",err);
      },
      complete:()=>{
        console.log("Peticion finalizada");
      }
    });
  }

  // Funcion para el textBox
  // onInput(event: Event){
  //   const updatedText = (event.target as HTMLElement).innerText;
  //   this.myForm.patchValue({ apunteTexto: updatedText });
  // }

  onInput(event: Event) {
    const div = this.textResumeRef.nativeElement;
    const selection = window.getSelection();

    // Verificar si hay un rango seleccionado
    if (selection && selection.rangeCount > 0) {
      const savedRange = selection.getRangeAt(0).cloneRange();

      const reversedText = div.innerText.split('').reverse().join('');
      div.innerText = reversedText;

      selection.removeAllRanges();
      selection.addRange(savedRange);

      this.myForm.patchValue({ apunteTexto: reversedText });
    }
  }

  toggleBold() {
    document.execCommand('bold', false, "");
  }

  toggleItalic() {
    document.execCommand('italic', false, "");
  }

  toggleUnderline() {
    document.execCommand('underline', false, "");
  }

  alignLeft() {
    document.execCommand('justifyLeft', false, "");
  }

  alignCenter() {
    document.execCommand('justifyCenter', false, "");
  }

  alignRight() {
    document.execCommand('justifyRight', false, "");
  }

  alignJustify() {
    document.execCommand('justifyFull', false, "");
  }

  increaseFontSize() {
    const textEditor = document.getElementById('text-editor');
    if (textEditor instanceof HTMLElement) {
      const currentFontSize = window.getComputedStyle(textEditor).fontSize;
      const fontSize = parseInt(currentFontSize) + 2;
      textEditor.style.fontSize = fontSize + 'px';
      this.updateFontSizeIndicator(fontSize);
    }
  }

  decreaseFontSize() {
    const textEditor = document.getElementById('text-editor');
    if (textEditor instanceof HTMLElement) {
      const currentFontSize = window.getComputedStyle(textEditor).fontSize;
      const fontSize = parseInt(currentFontSize) - 2;
      textEditor.style.fontSize = fontSize + 'px';
      this.updateFontSizeIndicator(fontSize);
    }
  }

  updateFontSizeIndicator(fontSize: number) {
    const fontSizeIndicator = document.getElementById('font-size-indicator');
    if (fontSizeIndicator instanceof HTMLElement) {
      fontSizeIndicator.textContent = fontSize + 'px';
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const br = document.createElement('br');
      range?.insertNode(br);
      range?.collapse(false);
      this.textResumeRef.nativeElement.innerText = this.textResumeRef.nativeElement.innerText;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
