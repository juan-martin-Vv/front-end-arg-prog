import { TestBed } from '@angular/core/testing';

import { ConectorRestService } from './conector-rest.service';

describe('ConectorRestService', () => {
  let service: ConectorRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConectorRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
