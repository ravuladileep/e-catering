import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaterThemeOneCartComponent } from './cater-theme-one-cart.component';

describe('CaterThemeOneCartComponent', () => {
  let component: CaterThemeOneCartComponent;
  let fixture: ComponentFixture<CaterThemeOneCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaterThemeOneCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaterThemeOneCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
