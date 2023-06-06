import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoguinService } from 'src/app/core/services/loguin.service';
import { Subject, takeUntil } from 'rxjs';

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
    public srvLoguin: LoguinService
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
      console.log(formData.email);
      console.log(formData.password);
      this.permisses(formData);
    }
  }

  //función para permitir acceso a la ruta me/welcome desde el servicio
  permisses( Loguin: any){
    this.srvLoguin.postlogin(Loguin)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res: any) => {
        console.log(res);
      }

    )

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
