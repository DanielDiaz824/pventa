import { TestBed } from '@angular/core/testing';

import { CrearclienteGuard } from './crearcliente.guard';

describe('CrearclienteGuard', () => {
  let guard: CrearclienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CrearclienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
