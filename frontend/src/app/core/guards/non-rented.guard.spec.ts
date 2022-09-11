import { TestBed } from '@angular/core/testing';

import { NonRentedGuard } from './non-rented.guard';

describe('NonRentedGuard', () => {
  let guard: NonRentedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonRentedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
