import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenNavigationComponent } from './garden-navigation.component';

describe('GardenNavigationComponent', () => {
  let component: GardenNavigationComponent;
  let fixture: ComponentFixture<GardenNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GardenNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
