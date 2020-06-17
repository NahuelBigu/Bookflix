import { TestBed } from '@angular/core/testing';

import { TrailerService } from './trailer.service';

describe('TrailerService', () => {
  let service: TrailerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
