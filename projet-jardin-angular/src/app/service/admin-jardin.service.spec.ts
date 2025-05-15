import { TestBed } from '@angular/core/testing';

import { AdminJardinService } from './admin-jardin.service';

describe('AdminJardinService', () => {
  let service: AdminJardinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminJardinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
