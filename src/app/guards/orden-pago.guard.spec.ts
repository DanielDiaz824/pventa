import { TestBed } from '@angular/core/testing';

import { OrdenPagoGuard } from './orden-pago.guard';

describe('OrdenPagoGuard', () => {
  let guard: OrdenPagoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrdenPagoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
