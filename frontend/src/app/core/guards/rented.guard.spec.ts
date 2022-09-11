import { TestBed } from '@angular/core/testing';

import { RentedGuard } from './rented.guard';

describe('RentedGuard', () => {
  let guard: RentedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RentedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
