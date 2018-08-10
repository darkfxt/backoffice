import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTemplateSummarizedCardComponent } from './trip-template-summarized-card.component';

describe('TripTemplateSummarizedCardComponent', () => {
  let component: TripTemplateSummarizedCardComponent;
  let fixture: ComponentFixture<TripTemplateSummarizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTemplateSummarizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTemplateSummarizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
