import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWhitinDatesComponent } from './user-whitin-dates.component';

describe('UserWhitinDatesComponent', () => {
  let component: UserWhitinDatesComponent;
  let fixture: ComponentFixture<UserWhitinDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWhitinDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWhitinDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
