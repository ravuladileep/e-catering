import { TestBed } from '@angular/core/testing';

import { TemplateGuard } from './template.guard';

describe('TemplateGuard', () => {
  let guard: TemplateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TemplateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
