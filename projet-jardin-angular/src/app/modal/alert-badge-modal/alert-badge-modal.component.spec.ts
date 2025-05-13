import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBadgeModalComponent } from './alert-badge-modal.component';

describe('AlertBadgeModalComponent', () => {
  let component: AlertBadgeModalComponent;
  let fixture: ComponentFixture<AlertBadgeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertBadgeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertBadgeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
