import { TestBed } from '@angular/core/testing';

import { EditclienteGuard } from './editcliente.guard';

describe('EditclienteGuard', () => {
  let guard: EditclienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditclienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
