import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePointsComponent } from './route-points.component';

describe('RoutePointsComponent', () => {
  let component: RoutePointsComponent;
  let fixture: ComponentFixture<RoutePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutePointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
