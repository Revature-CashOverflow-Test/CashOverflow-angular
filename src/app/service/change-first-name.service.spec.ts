import { TestBed } from '@angular/core/testing';

import { ChangeFirstNameService } from './change-first-name.service';

describe('ChangeFirstNameService', () => {
  let service: ChangeFirstNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeFirstNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
