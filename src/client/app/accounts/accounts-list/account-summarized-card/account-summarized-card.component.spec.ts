import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSummarizedCardComponent } from './account-summarized-card.component';

describe('AccountSummarizedCardComponent', () => {
  let component: AccountSummarizedCardComponent;
  let fixture: ComponentFixture<AccountSummarizedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSummarizedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummarizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
