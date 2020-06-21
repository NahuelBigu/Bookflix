import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerEditComponent } from './trailer-edit.component';

describe('TrailerEditComponent', () => {
  let component: TrailerEditComponent;
  let fixture: ComponentFixture<TrailerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
