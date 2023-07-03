import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ajustes-page',
  templateUrl: './ajustes-page.component.html',
  styleUrls: [ './ajustes-page.component.css'
  ]
})
export class AjustesPageComponent {
  private destroy$ = new Subject<any>();

  constructor(
  ) { }

ngOnDestroy(): void {
  this.destroy$.next({});
  this.destroy$.complete();
}

}
