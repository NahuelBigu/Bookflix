import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTrailersComponent } from './listar-trailers.component';

describe('ListarTrailersComponent', () => {
  let component: ListarTrailersComponent;
  let fixture: ComponentFixture<ListarTrailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTrailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTrailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
