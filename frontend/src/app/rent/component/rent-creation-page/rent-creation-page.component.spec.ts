import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCreationPageComponent } from './rent-creation-page.component';

describe('RentCreationPageComponent', () => {
  let component: RentCreationPageComponent;
  let fixture: ComponentFixture<RentCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentCreationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
