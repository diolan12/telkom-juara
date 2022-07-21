import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAttendanceComponent } from './widget-attendance.component';

describe('WidgetAttendanceComponent', () => {
  let component: WidgetAttendanceComponent;
  let fixture: ComponentFixture<WidgetAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
