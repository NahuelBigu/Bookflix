import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSampleComponent } from './book-sample.component';

describe('BookSampleComponent', () => {
  let component: BookSampleComponent;
  let fixture: ComponentFixture<BookSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});
