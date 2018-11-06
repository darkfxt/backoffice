import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSummarizedCardComponent } from './booking-summarized-card.component';

describe('BookingSummarizedCardComponent', () => {
  let component: BookingSummarizedCardComponent;
  let fixture: ComponentFixture<BookingSummarizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSummarizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSummarizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
