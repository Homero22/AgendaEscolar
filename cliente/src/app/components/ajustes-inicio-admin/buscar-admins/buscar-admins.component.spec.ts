import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAdminsComponent } from './buscar-admins.component';

describe('BuscarAdminsComponent', () => {
  let component: BuscarAdminsComponent;
  let fixture: ComponentFixture<BuscarAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarAdminsComponent]
    });
    fixture = TestBed.createComponent(BuscarAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
