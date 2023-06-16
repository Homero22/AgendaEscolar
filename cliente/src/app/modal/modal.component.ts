import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from '../core/services/modal.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  titleModal: string = '';
  modalView!: number;

  close!: boolean;

  private destroy$ = new Subject<any>();

  constructor(
    private srvModal: ModalService,
    //Cerramos a traves de matDialogRef el componente modal
    public refMateriaDialog: MatDialogRef<ModalComponent>
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

  //generamos el metodo para cerrar el modal
  closeModal() {

    //le colocamos el valor a close proveniente del servicio
    this.srvModal.selectCloseMatDialog$
      .pipe()
      .subscribe({
        next: (close) => {
          this.close = close;
          console.log("Valor de close =>", close);
        }
      });

      if(this.close){
        this.refMateriaDialog.close();
      }
  }


  ngOnDestry(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
