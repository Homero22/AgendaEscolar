import { Component } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  constructor(
    public srvModal: ModalService
  ) { }

  messageCerrar: boolean = false;

  cerrarForm(){
    this.messageCerrar = true;
    this.srvModal.setMessageCerrar(this.messageCerrar);
  }
}
