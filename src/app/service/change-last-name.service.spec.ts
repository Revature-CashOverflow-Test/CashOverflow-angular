import { TestBed } from '@angular/core/testing';

import { ChangeLastNameService } from './change-last-name.service';

describe('ChangeLastNameService', () => {
  let service: ChangeLastNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeLastNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
