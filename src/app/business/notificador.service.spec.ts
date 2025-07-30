import { TestBed } from '@angular/core/testing';

import { NotificadorService } from './notificador.service';

describe('NotificadorService', () => {
  let service: NotificadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
