import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTemplateDetailHeaderComponent } from './trip-template-detail-header.component';

describe('TripTemplateDetailHeaderComponent', () => {
  let component: TripTemplateDetailHeaderComponent;
  let fixture: ComponentFixture<TripTemplateDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTemplateDetailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTemplateDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
