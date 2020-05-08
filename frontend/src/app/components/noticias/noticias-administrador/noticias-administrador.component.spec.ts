import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasAdministradorComponent } from './noticias-administrador.component';

describe('NoticiasAdministradorComponent', () => {
  let component: NoticiasAdministradorComponent;
  let fixture: ComponentFixture<NoticiasAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiasAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
