import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScootersPageComponent } from './scooters-page.component';

describe('ScootersPageComponent', () => {
  let component: ScootersPageComponent;
  let fixture: ComponentFixture<ScootersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScootersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScootersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
