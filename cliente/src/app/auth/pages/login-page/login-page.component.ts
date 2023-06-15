import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoguinService } from 'src/app/core/services/loguin.service';
import { LoguinModel, ShowLoguinModel } from 'src/app/core/models/loguin';
// import { LoginSecurity } from 'src/app/core/security/loguin';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  hide = true;          //para el password
  email!: FormControl;  //para el email
  loginForm!: FormGroup;

  private destroy$ = new Subject<any>();

  constructor(
    public fb: FormBuilder,
    public srvLoguin: LoguinService,
    // public secLoguin: LoginSecurity,
    private router: Router
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.loginForm = this.fb.group({
      email: this.email,
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

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

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
