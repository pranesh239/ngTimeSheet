import { TestBed, inject } from '@angular/core/testing';

import { SecurityGuard } from './security-guard.service';

describe('SecurityGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityGuard]
    });
  });

  it('should be created', inject([SecurityGuard], (service: SecurityGuard) => {
    expect(service).toBeTruthy();
  }));
});
