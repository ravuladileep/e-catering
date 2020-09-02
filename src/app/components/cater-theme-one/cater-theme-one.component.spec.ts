import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaterThemeOneComponent } from './cater-theme-one.component';

describe('CaterThemeOneComponent', () => {
  let component: CaterThemeOneComponent;
  let fixture: ComponentFixture<CaterThemeOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaterThemeOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaterThemeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
