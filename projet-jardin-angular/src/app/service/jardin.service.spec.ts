import { TestBed } from '@angular/core/testing';

import { JardinService } from './jardin.service';

describe('JardinService', () => {
  let service: JardinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JardinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
