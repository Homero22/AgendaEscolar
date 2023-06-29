import { Component, AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoguinService } from 'src/app/core/services/loguin.service';
import { LoguinModel, ShowLoguinModel, JQuery } from 'src/app/core/models/loguin';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Horario, ModelShowHorario } from 'src/app/core/models/horario';
import Swal from 'sweetalert2';
import { HorarioService } from 'src/app/core/services/horario.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  hide = true;          //para el password
  email!: FormControl;  //para el email
  loginForm!: FormGroup;
  idUser!: number;
  private destroy$ = new Subject<any>();

  currentIndex: number = 0;


  constructor(
    public fb: FormBuilder,
    public srvLoguin: LoguinService,
    // public secLoguin: LoginSecurity,
    private router: Router,
    public srvHorario: HorarioService
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.loginForm = this.fb.group({
      email: this.email,
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.initCarousel();

  }

  // ngAfterViewInit(): void {
  //   this.initCarousel(); // Llama a initCarousel() en ngAfterViewInit()
  // }

  getErrorMessage() {
    // if (this.email.hasError('required')) {
    //   return 'Debe ingresar un correo electrónico';
    // }

    return this.email.hasError('email') ? 'Correo ingresado no valido' : '';
  }

  submitForm() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.iniciaSesion(formData);
    }
  }

  //función para permitir acceso a la ruta me/welcome desde el servicio
  iniciaSesion( Loguin: LoguinModel){
    this.srvLoguin.postlogin(Loguin)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res: ShowLoguinModel) => {
        console.log("rspuesta server -> ",res);
        if(res.status){
          sessionStorage.setItem('token', res.token);

          sessionStorage.setItem('body', JSON.stringify(res.body)),
          //imprimimos el body
          console.log("body -> ",res.body);

          const storedBody = sessionStorage.getItem('body');
          if (storedBody) {
            const parsedBody = JSON.parse(storedBody);
            const idUser = parsedBody.id;
            const userRol = parsedBody.rol;
            console.log("Valor del IdUser =>",idUser);
            sessionStorage.setItem('id', idUser);
            sessionStorage.setItem('rol', userRol);

            //usamos el behaviorSubject para enviar el id del usuario
            this.srvLoguin.setIdUser(idUser);
          }


           this.router.navigate(['/me/welcome']);
        }
        else{
          //resetear el formulario
          this.loginForm.reset();
          //mostrar error de contraseña o correo incorrecto
          this.getErrorMessage()
        }
      },(error) => {
        // Error de acceso denegado (401 Unauthorized)
        if (error.status === 401) {
          // Aquí puedes redirigir al usuario a una página de acceso denegado o mostrar un mensaje apropiado
         // this.router.navigate(['/access-denied']);
          //mensaje de error
          alert("Acceso denegado");
        } else {
          // Otro tipo de error, manejarlo según corresponda
          console.error("Error en la solicitud:", error);
        }
      }
    )
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem("token");
    // Check whether the token is expired and return
    // true or false
    return this.isNotEmpty(token);
}

public isNotEmpty(obj: any): boolean {
    return !this.isEmpty(obj);
  }

  public isEmpty(obj: any): boolean {
    return obj == undefined || obj == null || obj == '' || obj == ' ';
  }

    public isNotEmptyString(obj: any): boolean {
    return !this.isEmptyString(obj);
    }

    public isEmptyString(obj: any): boolean {
    return obj == undefined || obj == null || obj == '';
    }

    // obtenerHorario(){
    //   Swal.fire({
    //     title: 'Cargando Horario...',
    //     didOpen: () => {
    //       Swal.showLoading()
    //     }
    //   });
    //   this.srvHorario.getHorarioUser(this.idUser)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (homero: ModelShowHorario)=>{
    //       this.srvHorario.dataHorario = homero.body;
    //         console.log("Horario de homero =>", homero);
    //         // this.srvHorario.dataorario = this.srvHorario.transfor(homero.body, this.srvHorario.horario)
    //         this.transf();
    //         console.log("Horario transdormado en horario=>", this.srvHorario.horario);
    //         Swal.close();
    //     }
    //   })
    // }

    // transf(){
    //   const horario: Horario = this.srvHorario.dataHorario.reduce((acc: Horario, item) => {
    //     const { dia, hora_inicio, hora_fin, nombreMateria, acronimo, color, id, idMateria } = item;
    //     const horaInicioStr = `${hora_inicio.hour}:${hora_inicio.minute.toString().padStart(2, '0')}`;
    //     const horaFinStr = `${hora_fin.hour}:${hora_fin.minute.toString().padStart(2, '0')}`;
      
    //     if (!acc[dia]) {
    //       acc[dia] = {};
    //     }
      
    //     acc[dia][horaInicioStr] = {
    //       materia: nombreMateria,
    //       horaFin: horaFinStr,
    //       color: color,
    //       acronimo: acronimo,
    //       id: id,
    //       idMateria: idMateria
    //     };
      
    //     return acc;
    //   }, {});
    
    //   console.log("horario transformado =>", horario);
    //   this.srvHorario.horario = horario;
    // }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  //para la slide
/*
  initCarousel(): void {
    const carousel = document.getElementById('carousel');
  
    if (carousel) {
      const slides = carousel.querySelectorAll('.item');
      const prevButton = carousel.querySelector('.carousel-control.left');
      const nextButton = carousel.querySelector('.carousel-control.right');
  
      const showSlide = (index: number) => {
        slides[this.currentIndex].classList.remove('active');
        slides[index].classList.add('active');
        this.currentIndex = index;
      };
  
      const showNextSlide = () => {
        const nextIndex = (this.currentIndex + 1) % slides.length;
        showSlide(nextIndex);
      };
  
      const showPreviousSlide = () => {
        const prevIndex = (this.currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
      };
  
      if (prevButton) {
        prevButton.addEventListener('click', showPreviousSlide);
      }
  
      if (nextButton) {
        nextButton.addEventListener('click', showNextSlide);
      }
    }
  }
  */
  
  
}
