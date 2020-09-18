import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaterThemeOneItemsComponent } from './cater-theme-one-items.component';

describe('CaterThemeOneItemsComponent', () => {
  let component: CaterThemeOneItemsComponent;
  let fixture: ComponentFixture<CaterThemeOneItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaterThemeOneItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaterThemeOneItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
