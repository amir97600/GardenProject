import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJardinComponent } from './admin-jardin.component';

describe('AdminJardinComponent', () => {
  let component: AdminJardinComponent;
  let fixture: ComponentFixture<AdminJardinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminJardinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
