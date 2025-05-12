import { TestBed } from '@angular/core/testing';

import { AdminUtilisateurService } from './admin-utilisateur.service';

describe('AdminUtilisateurService', () => {
  let service: AdminUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
