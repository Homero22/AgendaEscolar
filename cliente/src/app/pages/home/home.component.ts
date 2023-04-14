import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

mostrarForm = false;

cerrarFormulario: boolean = true;

private destroy$ = new Subject<any>();

constructor(
  public srvNodal: ModalService
) { }

  ngOnInit(): void {



    this.srvNodal.selectMessage$
    .pipe(takeUntil(this.destroy$))
    .subscribe((message) => {
      this.cerrarFormulario = message;
      this.mostrarForm = this.cerrarFormulario;
    });
  }

  inscribirse(){
    this.mostrarForm = true;
  }


}
