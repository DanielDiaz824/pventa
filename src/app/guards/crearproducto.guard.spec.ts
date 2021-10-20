import { TestBed } from '@angular/core/testing';

import { CrearproductoGuard } from './crearproducto.guard';

describe('CrearproductoGuard', () => {
  let guard: CrearproductoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CrearproductoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
