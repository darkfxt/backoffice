import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFiltersComponent } from './booking-filters.component';

describe('BookingFiltersComponent', () => {
  let component: BookingFiltersComponent;
  let fixture: ComponentFixture<BookingFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
