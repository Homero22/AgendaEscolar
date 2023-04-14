import { TestBed } from '@angular/core/testing';

import { ConferenciasService } from './conferencias.service';

describe('ConferenciasService', () => {
  let service: ConferenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConferenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
