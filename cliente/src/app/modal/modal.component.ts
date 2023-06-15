import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  public formType: string = '';
  public titleModal: string = '';
  triggerModal?: boolean;

  private destroy$ = new Subject<any>();




}
