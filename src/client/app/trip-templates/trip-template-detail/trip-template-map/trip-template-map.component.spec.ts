import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTemplateMapComponent } from './trip-template-map.component';

describe('TripTemplateMapComponent', () => {
  let component: TripTemplateMapComponent;
  let fixture: ComponentFixture<TripTemplateMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTemplateMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTemplateMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
