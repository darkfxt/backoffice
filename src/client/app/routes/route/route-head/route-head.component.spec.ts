import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteHeadComponent } from './route-head.component';

describe('RouteHeadComponent', () => {
  let component: RouteHeadComponent;
  let fixture: ComponentFixture<RouteHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
