import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboItemDialogComponent } from './combo-item-dialog.component';

describe('ComboItemDialogComponent', () => {
  let component: ComboItemDialogComponent;
  let fixture: ComponentFixture<ComboItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
