import { TestBed } from '@angular/core/testing';

import { EditproductoGuard } from './editproducto.guard';

describe('EditproductoGuard', () => {
  let guard: EditproductoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditproductoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
