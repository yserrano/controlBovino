import { TestBed, inject } from '@angular/core/testing';

import { BovinoService } from './bovino.service';

describe('BovinoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BovinoService]
    });
  });

  it('should ...', inject([BovinoService], (service: BovinoService) => {
    expect(service).toBeTruthy();
  }));
});
