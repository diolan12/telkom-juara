import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWeeklyComponent } from './order-weekly.component';

describe('OrderWeeklyComponent', () => {
  let component: OrderWeeklyComponent;
  let fixture: ComponentFixture<OrderWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
