import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPhotoDialogComponent } from './order-photo-dialog.component';

describe('OrderPhotoDialogComponent', () => {
  let component: OrderPhotoDialogComponent;
  let fixture: ComponentFixture<OrderPhotoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPhotoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
