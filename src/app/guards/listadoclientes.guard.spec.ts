import { TestBed } from '@angular/core/testing';

import { ListadoclientesGuard } from './listadoclientes.guard';

describe('ListadoclientesGuard', () => {
  let guard: ListadoclientesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ListadoclientesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
