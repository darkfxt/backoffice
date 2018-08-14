import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSummarizedCardComponent } from './event-summarized-card.component';

describe('EventSummarizedCardComponent', () => {
  let component: EventSummarizedCardComponent;
  let fixture: ComponentFixture<EventSummarizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSummarizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSummarizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
