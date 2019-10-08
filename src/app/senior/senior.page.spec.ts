import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorPage } from './senior.page';

describe('SeniorPage', () => {
  let component: SeniorPage;
  let fixture: ComponentFixture<SeniorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
