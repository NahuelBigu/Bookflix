import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerNewOrEditComponent } from './trailer-new-or-edit.component';

describe('TrailerNewOrEditComponent', () => {
  let component: TrailerNewOrEditComponent;
  let fixture: ComponentFixture<TrailerNewOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerNewOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerNewOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
