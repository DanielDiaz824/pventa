import { TestBed } from '@angular/core/testing';

import { CreateaccountGuard } from './createaccount.guard';

describe('CreateaccountGuard', () => {
  let guard: CreateaccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreateaccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
