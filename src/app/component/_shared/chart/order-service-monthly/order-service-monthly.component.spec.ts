import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceMonthlyComponent } from './order-service-monthly.component';

describe('OrderServiceMonthlyComponent', () => {
  let component: OrderServiceMonthlyComponent;
  let fixture: ComponentFixture<OrderServiceMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderServiceMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServiceMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
