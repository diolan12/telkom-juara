import { TestBed } from '@angular/core/testing';

import { OrderPhotoService } from './order-photo.service';

describe('OrderPhotoService', () => {
  let service: OrderPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
