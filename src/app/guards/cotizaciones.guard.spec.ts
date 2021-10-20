import { TestBed } from '@angular/core/testing';

import { CotizacionesGuard } from './cotizaciones.guard';

describe('CotizacionesGuard', () => {
  let guard: CotizacionesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CotizacionesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
