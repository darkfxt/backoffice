import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizedDrivingComponent } from './summarized-driving.component';

describe('SummarizedDrivingComponent', () => {
  let component: SummarizedDrivingComponent;
  let fixture: ComponentFixture<SummarizedDrivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarizedDrivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizedDrivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
