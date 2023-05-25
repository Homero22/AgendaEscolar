import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';


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
) {
  this.email = new FormControl('', [Validators.required, Validators.email]);
}

ngOnInit(): void {}
getErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }

  return this.email.hasError('email') ? 'Not a valid email' : '';
}

ngOnDestroy(): void {
  this.destroy$.next({});
  this.destroy$.complete();
}

}
