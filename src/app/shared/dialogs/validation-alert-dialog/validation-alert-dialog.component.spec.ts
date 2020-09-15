import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAlertDialogComponent } from './validation-alert-dialog.component';

describe('ValidationAlertDialogComponent', () => {
  let component: ValidationAlertDialogComponent;
  let fixture: ComponentFixture<ValidationAlertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationAlertDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
