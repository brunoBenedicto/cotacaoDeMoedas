import { TestBed } from '@angular/core/testing';

import { BuscaFormService } from './busca-form.service';

describe('BuscaFormService', () => {
  let service: BuscaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
