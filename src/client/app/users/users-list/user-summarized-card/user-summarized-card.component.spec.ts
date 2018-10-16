import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSummarizedCardComponent } from './user-summarized-card.component';

describe('UserSummarizedCardComponent', () => {
  let component: UserSummarizedCardComponent;
  let fixture: ComponentFixture<UserSummarizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSummarizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSummarizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
