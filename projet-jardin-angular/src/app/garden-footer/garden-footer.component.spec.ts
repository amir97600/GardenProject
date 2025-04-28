import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenFooterComponent } from './garden-footer.component';

describe('GardenFooterComponent', () => {
  let component: GardenFooterComponent;
  let fixture: ComponentFixture<GardenFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GardenFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
