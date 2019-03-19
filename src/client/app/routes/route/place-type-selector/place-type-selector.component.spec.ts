import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTypeSelectorComponent } from './place-type-selector.component';

describe('PlaceTypeSelectorComponent', () => {
  let component: PlaceTypeSelectorComponent;
  let fixture: ComponentFixture<PlaceTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
