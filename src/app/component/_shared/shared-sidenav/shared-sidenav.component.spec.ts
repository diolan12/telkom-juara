import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSidenavComponent } from './shared-sidenav.component';

describe('SharedSidenavComponent', () => {
  let component: SharedSidenavComponent;
  let fixture: ComponentFixture<SharedSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
