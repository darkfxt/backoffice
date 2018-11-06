import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizedDefaultComponent } from './summarized-default.component';

describe('SummarizedDefaultComponent', () => {
  let component: SummarizedDefaultComponent;
  let fixture: ComponentFixture<SummarizedDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarizedDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizedDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
