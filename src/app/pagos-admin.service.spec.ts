import { TestBed } from '@angular/core/testing';

import { PagosAdminService } from './pagos-admin.service';

describe('PagosAdminService', () => {
  let service: PagosAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagosAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
