import { TestBed } from '@angular/core/testing';

import { CountrieService } from './countrie.service';

describe('CountrieService', () => {
  let service: CountrieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountrieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
