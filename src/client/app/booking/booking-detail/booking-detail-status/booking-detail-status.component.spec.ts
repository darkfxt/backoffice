import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailStatusComponent } from './booking-detail-status.component';

describe('BookingDetailStatusComponent', () => {
  let component: BookingDetailStatusComponent;
  let fixture: ComponentFixture<BookingDetailStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingDetailStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
