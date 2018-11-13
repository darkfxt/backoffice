import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSummarizedCardComponent } from './device-summarized-card.component';

describe('DeviceSummarizedCardComponent', () => {
  let component: DeviceSummarizedCardComponent;
  let fixture: ComponentFixture<DeviceSummarizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSummarizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSummarizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
