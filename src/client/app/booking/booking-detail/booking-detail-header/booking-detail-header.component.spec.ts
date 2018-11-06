import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailHeaderComponent } from './booking-detail-header.component';

describe('BookingDetailHeaderComponent', () => {
  let component: BookingDetailHeaderComponent;
  let fixture: ComponentFixture<BookingDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingDetailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
