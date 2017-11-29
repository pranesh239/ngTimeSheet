import { TestBed, inject } from '@angular/core/testing';

import { TimeCalcService } from './time-calc.service';

describe('TimeCalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeCalcService]
    });
  });

  it('should be created', inject([TimeCalcService], (service: TimeCalcService) => {
    expect(service).toBeTruthy();
  }));
});
