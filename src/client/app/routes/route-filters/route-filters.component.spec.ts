import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteFiltersComponent } from './route-filters.component';

describe('RouteFiltersComponent', () => {
  let component: RouteFiltersComponent;
  let fixture: ComponentFixture<RouteFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
