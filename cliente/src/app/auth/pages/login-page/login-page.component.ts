import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoguinService } from 'src/app/core/services/loguin.service';
import { ShowLoguinModel, LoguinModel } from 'src/app/core/models/loguin';
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
      this.permisses(formData);
    }
  }

  //función para permitir acceso a la ruta me/welcome desde el servicio
  permisses( Loguin: LoguinModel){
    this.srvLoguin.postlogin(Loguin)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res: ShowLoguinModel) => {
        console.log("rspuesta server -> ",res);
        if(res.status){
           this.router.navigate(['/me/welcome']);
        }
        else{
          //resetear el formulario
          this.loginForm.reset();
          //mostrar error de contraseña o correo incorrecto
          this.getErrorMessage()
        }
      }

    )

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
