import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceYearlyComponent } from './order-service-yearly.component';

describe('OrderServiceYearlyComponent', () => {
  let component: OrderServiceYearlyComponent;
  let fixture: ComponentFixture<OrderServiceYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderServiceYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServiceYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
