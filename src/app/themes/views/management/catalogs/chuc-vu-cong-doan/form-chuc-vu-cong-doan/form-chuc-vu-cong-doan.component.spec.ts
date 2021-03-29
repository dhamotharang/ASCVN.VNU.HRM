/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChucVuCongDoanComponent } from './form-chuc-vu-cong-doan.component';

describe('FormChucVuCongDoanComponent', () => {
  let component: FormChucVuCongDoanComponent;
  let fixture: ComponentFixture<FormChucVuCongDoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChucVuCongDoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChucVuCongDoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
