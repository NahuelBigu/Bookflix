import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarLibroComponent } from './cargar-libro.component';

describe('CargarLibroComponent', () => {
  let component: CargarLibroComponent;
  let fixture: ComponentFixture<CargarLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
