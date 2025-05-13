import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilterBarComponent } from './admin-filter-bar.component';

describe('AdminFilterBarComponent', () => {
  let component: AdminFilterBarComponent;
  let fixture: ComponentFixture<AdminFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFilterBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
