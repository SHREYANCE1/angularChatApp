import { TestBed } from '@angular/core/testing';

import { ChatRouteGaurdService } from './chat-route-gaurd.service';

describe('ChatRouteGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatRouteGaurdService = TestBed.get(ChatRouteGaurdService);
    expect(service).toBeTruthy();
  });
});
