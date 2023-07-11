import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioUserComponent } from './inicio-user.component';

describe('InicioUserComponent', () => {
  let component: InicioUserComponent;
  let fixture: ComponentFixture<InicioUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioUserComponent]
    });
    fixture = TestBed.createComponent(InicioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
