import { TestBed } from '@angular/core/testing';

import { JobSearchService } from './job-search.service';

describe('JobSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobSearchService = TestBed.get(JobSearchService);
    expect(service).toBeTruthy();
  });
});
