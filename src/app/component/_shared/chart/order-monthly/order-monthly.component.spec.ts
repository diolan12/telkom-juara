import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMonthlyComponent } from './order-monthly.component';

describe('OrderMonthlyComponent', () => {
  let component: OrderMonthlyComponent;
  let fixture: ComponentFixture<OrderMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
