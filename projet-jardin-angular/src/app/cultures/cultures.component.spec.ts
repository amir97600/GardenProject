import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturesComponent } from './cultures.component';

describe('CulturesComponent', () => {
  let component: CulturesComponent;
  let fixture: ComponentFixture<CulturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CulturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
