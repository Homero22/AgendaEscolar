import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoguinService } from '../../core/services/loguin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
      const formData = this.loginForm.value;
      console.log(formData.email);
      console.log(formData.password);
  }





ngOnDestroy(): void {
  this.destroy$.next({});
  this.destroy$.complete();
}

}
