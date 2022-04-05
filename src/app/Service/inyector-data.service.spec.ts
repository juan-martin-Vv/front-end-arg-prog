import { TestBed } from '@angular/core/testing';

import { InyectorDataService } from './inyector-data.service';

describe('InyectorDataService', () => {
  let service: InyectorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InyectorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
