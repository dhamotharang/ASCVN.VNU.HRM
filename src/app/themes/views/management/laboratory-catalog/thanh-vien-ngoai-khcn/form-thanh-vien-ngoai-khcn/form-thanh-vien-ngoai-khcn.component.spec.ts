/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThanhVienNgoaiKhcnComponent } from './form-thanh-vien-ngoai-khcn.component';

describe('FormThanhVienNgoaiKhcnComponent', () => {
  let component: FormThanhVienNgoaiKhcnComponent;
  let fixture: ComponentFixture<FormThanhVienNgoaiKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThanhVienNgoaiKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThanhVienNgoaiKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
