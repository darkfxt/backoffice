import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTemplatesComponent } from './trip-templates.component';

describe('TripTemplatesComponent', () => {
  let component: TripTemplatesComponent;
  let fixture: ComponentFixture<TripTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
