import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasLasNoticiasComponent } from './todas-las-noticias.component';

describe('TodasLasNoticiasComponent', () => {
  let component: TodasLasNoticiasComponent;
  let fixture: ComponentFixture<TodasLasNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodasLasNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasLasNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
