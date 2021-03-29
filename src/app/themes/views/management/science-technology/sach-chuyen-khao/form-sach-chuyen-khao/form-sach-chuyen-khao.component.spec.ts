/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormSachChuyenKhaoComponent } from './form-sach-chuyen-khao.component';

describe('FormSachChuyenKhaoComponent', () => {
  let component: FormSachChuyenKhaoComponent;
  let fixture: ComponentFixture<FormSachChuyenKhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSachChuyenKhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSachChuyenKhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
