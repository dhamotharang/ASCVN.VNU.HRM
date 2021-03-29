/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChucVuDoanComponent } from './form-chuc-vu-doan.component';

describe('FormChucVuDoanComponent', () => {
  let component: FormChucVuDoanComponent;
  let fixture: ComponentFixture<FormChucVuDoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChucVuDoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChucVuDoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
