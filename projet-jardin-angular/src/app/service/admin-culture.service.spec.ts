import { TestBed } from '@angular/core/testing';

import { AdminCultureService } from './admin-culture.service';

describe('AdminCultureService', () => {
  let service: AdminCultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCultureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
