import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  titleModal: string = '';
  modalView!: number;

  private destroy$ = new Subject<any>();

  constructor(
    private srvModal: ModalService
  ) { }



  ngOnInit(): void {
    console.log("ngOnInit");
    this.getTitleModal();
  }


  getTitleModal() {
    this.srvModal.selectTitleModal$
      .pipe()
      .subscribe({
        next: (titleModal) => {
          this.titleModal = titleModal;
          console.log("Valor del title agarrado en el modal =>", titleModal);
        }

      });
  }



  ngOnDestry(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
