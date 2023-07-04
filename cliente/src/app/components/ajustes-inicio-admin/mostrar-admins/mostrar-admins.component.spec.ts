import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAdminsComponent } from './mostrar-admins.component';

describe('MostrarAdminsComponent', () => {
  let component: MostrarAdminsComponent;
  let fixture: ComponentFixture<MostrarAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarAdminsComponent]
    });
    fixture = TestBed.createComponent(MostrarAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
