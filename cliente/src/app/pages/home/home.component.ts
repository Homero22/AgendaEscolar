import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  hide = true;
  email!: FormControl;

private destroy$ = new Subject<any>();

constructor(
  // public fb: FormBuilder,
) {
  this.email = new FormControl('', [Validators.required, Validators.email]);
}

ngOnInit(): void {}
getErrorMessage() {
  // if (this.email.hasError('required')) {
  //   return 'Debe ingresar un correo electrónico';
  // }

  return this.email.hasError('email') ? 'Correo ingresado no valido' : '';
}

ngOnDestroy(): void {
  this.destroy$.next({});
  this.destroy$.complete();
}

}
