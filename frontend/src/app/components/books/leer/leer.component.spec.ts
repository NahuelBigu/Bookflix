import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerComponent } from './leer.component';

describe('LeerComponent', () => {
  let component: LeerComponent;
  let fixture: ComponentFixture<LeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
