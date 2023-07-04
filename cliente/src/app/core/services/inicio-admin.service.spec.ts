import { TestBed } from '@angular/core/testing';

import { InicioAdminService } from './inicio-admin.service';

describe('InicioAdminService', () => {
  let service: InicioAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicioAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
