import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSummarizedCardComponent } from './route-summarized-card.component';

describe('RouteSummarizedCardComponent', () => {
  let component: RouteSummarizedCardComponent;
  let fixture: ComponentFixture<RouteSummarizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteSummarizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSummarizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
