import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesAdministradorComponent } from './opciones-administrador.component';

describe('OpcionesAdministradorComponent', () => {
  let component: OpcionesAdministradorComponent;
  let fixture: ComponentFixture<OpcionesAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
