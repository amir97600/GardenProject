import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanteComponent } from './admin-plante.component';

describe('AdminPlanteComponent', () => {
  let component: AdminPlanteComponent;
  let fixture: ComponentFixture<AdminPlanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPlanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
