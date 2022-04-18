import { TestBed } from '@angular/core/testing';

import { AddSocialService } from './add-social.service';

describe('AddSocialService', () => {
  let service: AddSocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSocialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
