import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectperfilComponent } from './selectperfil.component';

describe('SelectperfilComponent', () => {
  let component: SelectperfilComponent;
  let fixture: ComponentFixture<SelectperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
