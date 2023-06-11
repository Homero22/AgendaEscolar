/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MateriaService } from './materia.service';

describe('Service: Materia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MateriaService]
    });
  });

  it('should ...', inject([MateriaService], (service: MateriaService) => {
    expect(service).toBeTruthy();
  }));
});
