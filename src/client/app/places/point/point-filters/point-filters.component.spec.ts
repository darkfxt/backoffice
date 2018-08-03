import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointFiltersComponent } from './point-filters.component';

describe('PointFiltersComponent', () => {
  let component: PointFiltersComponent;
  let fixture: ComponentFixture<PointFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
