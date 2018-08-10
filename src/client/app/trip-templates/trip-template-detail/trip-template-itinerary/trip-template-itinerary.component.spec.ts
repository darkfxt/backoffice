import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTemplateItineraryComponent } from './trip-template-itinerary.component';

describe('TripTemplateItineraryComponent', () => {
  let component: TripTemplateItineraryComponent;
  let fixture: ComponentFixture<TripTemplateItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTemplateItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTemplateItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
