import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCoverComponent } from './route-cover.component';

describe('RouteCoverComponent', () => {
  let component: RouteCoverComponent;
  let fixture: ComponentFixture<RouteCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
