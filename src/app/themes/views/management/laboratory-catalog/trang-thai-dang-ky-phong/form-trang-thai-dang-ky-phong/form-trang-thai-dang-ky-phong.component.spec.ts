/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTrangThaiDangKyPhongComponent } from './form-trang-thai-dang-ky-phong.component';

describe('FormTrangThaiDangKyPhongComponent', () => {
  let component: FormTrangThaiDangKyPhongComponent;
  let fixture: ComponentFixture<FormTrangThaiDangKyPhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTrangThaiDangKyPhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTrangThaiDangKyPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
