import { TestBed } from '@angular/core/testing';

import { DashboardServService } from './dashboard-serv.service';

describe('DashboardServService', () => {
  let service: DashboardServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
