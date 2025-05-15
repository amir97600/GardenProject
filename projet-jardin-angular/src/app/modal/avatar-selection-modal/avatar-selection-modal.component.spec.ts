import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarSelectionModalComponent } from './avatar-selection-modal.component';

describe('AvatarSelectionModalComponent', () => {
  let component: AvatarSelectionModalComponent;
  let fixture: ComponentFixture<AvatarSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarSelectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
