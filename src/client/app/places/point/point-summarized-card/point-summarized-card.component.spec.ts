import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSummarizedCardComponent } from './point-summarized-card.component';

describe('PointSummarizedCardComponent', () => {
  let component: PointSummarizedCardComponent;
  let fixture: ComponentFixture<PointSummarizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointSummarizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointSummarizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
