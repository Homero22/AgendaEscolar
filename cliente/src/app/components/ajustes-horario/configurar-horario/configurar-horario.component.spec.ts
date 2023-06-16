import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarHorarioComponent } from './configurar-horario.component';

describe('ConfigurarHorarioComponent', () => {
  let component: ConfigurarHorarioComponent;
  let fixture: ComponentFixture<ConfigurarHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurarHorarioComponent]
    });
    fixture = TestBed.createComponent(ConfigurarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
