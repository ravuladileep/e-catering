import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboDialogComponent } from './combo-dialog.component';

describe('ComboDialogComponent', () => {
  let component: ComboDialogComponent;
  let fixture: ComponentFixture<ComboDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
