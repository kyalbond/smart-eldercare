import { TestBed } from '@angular/core/testing';

import { MqqtService } from './mqqt.service';

describe('MqqtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MqqtService = TestBed.get(MqqtService);
    expect(service).toBeTruthy();
  });
});
