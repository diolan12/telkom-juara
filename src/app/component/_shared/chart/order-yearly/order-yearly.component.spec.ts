import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderYearlyComponent } from './order-yearly.component';

describe('OrderYearlyComponent', () => {
  let component: OrderYearlyComponent;
  let fixture: ComponentFixture<OrderYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
