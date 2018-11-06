import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailItineraryComponent } from './booking-detail-itinerary.component';

describe('BookingDetailItineraryComponent', () => {
  let component: BookingDetailItineraryComponent;
  let fixture: ComponentFixture<BookingDetailItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingDetailItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
