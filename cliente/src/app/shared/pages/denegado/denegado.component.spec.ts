import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenegadoComponent } from './denegado.component';

describe('DenegadoComponent', () => {
  let component: DenegadoComponent;
  let fixture: ComponentFixture<DenegadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DenegadoComponent]
    });
    fixture = TestBed.createComponent(DenegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
