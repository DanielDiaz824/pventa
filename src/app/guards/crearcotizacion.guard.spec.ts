import { TestBed } from '@angular/core/testing';

import { CrearcotizacionGuard } from './crearcotizacion.guard';

describe('CrearcotizacionGuard', () => {
  let guard: CrearcotizacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CrearcotizacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
