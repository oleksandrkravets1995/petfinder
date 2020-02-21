import { TestBed } from '@angular/core/testing';

import { AnnouncementHttpService } from './announcement-http.service';

describe('ServiceHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncementHttpService = TestBed.get(AnnouncementHttpService);
    expect(service).toBeTruthy();
  });
});
