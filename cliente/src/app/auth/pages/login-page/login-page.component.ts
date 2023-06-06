import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

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
      // Aquí puedes hacer lo que necesites con los valores de los inputs
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
