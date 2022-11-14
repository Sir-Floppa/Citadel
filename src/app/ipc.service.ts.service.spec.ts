import { TestBed } from '@angular/core/testing';

import { Ipc.Service.TsService } from './ipc.service.ts.service';

describe('Ipc.Service.TsService', () => {
  let service: Ipc.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ipc.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
