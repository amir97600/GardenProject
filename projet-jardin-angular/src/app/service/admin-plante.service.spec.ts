import { TestBed } from '@angular/core/testing';

import { AdminPlanteService } from './admin-plante.service';

describe('AdminPlanteService', () => {
  let service: AdminPlanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPlanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
