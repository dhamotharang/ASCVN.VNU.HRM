/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChucDanhComponent } from './form-chuc-danh.component';

describe('FormChucDanhComponent', () => {
  let component: FormChucDanhComponent;
  let fixture: ComponentFixture<FormChucDanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChucDanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChucDanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
