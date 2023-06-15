import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loguinSecurityGuard } from './loguin-security.guard';

describe('loguinSecurityGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loguinSecurityGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
