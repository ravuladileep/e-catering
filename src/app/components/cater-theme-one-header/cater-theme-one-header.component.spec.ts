import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaterThemeOneHeaderComponent } from './cater-theme-one-header.component';

describe('CaterThemeOneHeaderComponent', () => {
  let component: CaterThemeOneHeaderComponent;
  let fixture: ComponentFixture<CaterThemeOneHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaterThemeOneHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaterThemeOneHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
