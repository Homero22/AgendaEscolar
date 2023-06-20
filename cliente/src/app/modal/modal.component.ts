import { Component } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ModalService } from '../core/services/modal.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  private closeSubscription!: Subscription;

  titleModal: string = '';
  modalView!: number;

  close!: boolean;

  private destroy$ = new Subject<any>();

  constructor(
    private srvModal: ModalService,
    private dialogRef: MatDialogRef<ModalComponent>,
  ) { }


// método ngOnInit para inicializar el modal
  ngOnInit(): void {
    console.log("ngOnInit");
    this.getTitleModal();

    this.closeSubscription = this.srvModal.selectCloseMatDialog$
    .pipe(takeUntil(this.destroy$))
    .subscribe((closeMatDialog: any) => {
      if (closeMatDialog) {
        this.closeModal();
      }
    }
    );
  }

  // Función para obtener el titulo del modal.
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
  closeModal(): void {
    // Cierra el mat-dialog
    this.dialogRef.close();
  }

  // mwtodo ngOnDestroy para destruir el modal
  ngOnDestry(): void {
    this.destroy$.next({});
    this.destroy$.complete();

    this.closeSubscription.unsubscribe();
  }
}
