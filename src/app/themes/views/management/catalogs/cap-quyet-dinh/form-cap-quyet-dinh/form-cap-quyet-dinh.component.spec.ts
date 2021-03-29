/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormCapQuyetDinhComponent } from './form-cap-quyet-dinh.component';

describe('FormCapQuyetDinhComponent', () => {
  let component: FormCapQuyetDinhComponent;
  let fixture: ComponentFixture<FormCapQuyetDinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCapQuyetDinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCapQuyetDinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
