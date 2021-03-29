/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChucVuDangComponent } from './form-chuc-vu-dang.component';

describe('FormChucVuDangComponent', () => {
  let component: FormChucVuDangComponent;
  let fixture: ComponentFixture<FormChucVuDangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChucVuDangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChucVuDangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
