import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypeDialogComponent } from './service-type-dialog.component';

describe('ServiceTypeDialogComponent', () => {
  let component: ServiceTypeDialogComponent;
  let fixture: ComponentFixture<ServiceTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
