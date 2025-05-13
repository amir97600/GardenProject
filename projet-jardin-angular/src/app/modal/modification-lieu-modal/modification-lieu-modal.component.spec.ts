import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationLieuModalComponent } from './modification-lieu-modal.component';

describe('ModificationLieuModalComponent', () => {
  let component: ModificationLieuModalComponent;
  let fixture: ComponentFixture<ModificationLieuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificationLieuModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationLieuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
