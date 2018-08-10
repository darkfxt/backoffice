import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTemplateDetailComponent } from './trip-template-detail.component';

describe('TripTemplateDetailComponent', () => {
  let component: TripTemplateDetailComponent;
  let fixture: ComponentFixture<TripTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
