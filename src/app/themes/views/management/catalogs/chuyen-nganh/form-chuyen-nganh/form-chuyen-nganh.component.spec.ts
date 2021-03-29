/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChuyenNganhComponent } from './form-chuyen-nganh.component';

describe('FormChuyenNganhComponent', () => {
  let component: FormChuyenNganhComponent;
  let fixture: ComponentFixture<FormChuyenNganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChuyenNganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChuyenNganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
