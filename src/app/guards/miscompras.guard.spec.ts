import { TestBed } from '@angular/core/testing';

import { MiscomprasGuard } from './miscompras.guard';

describe('MiscomprasGuard', () => {
  let guard: MiscomprasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MiscomprasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
