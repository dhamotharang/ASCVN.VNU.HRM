/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormGiaiThuongKhoaHocCongNgheComponent } from './form-giai-thuong-khoa-hoc-cong-nghe.component';

describe('FormGiaiThuongKhoaHocCongNgheComponent', () => {
  let component: FormGiaiThuongKhoaHocCongNgheComponent;
  let fixture: ComponentFixture<FormGiaiThuongKhoaHocCongNgheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGiaiThuongKhoaHocCongNgheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGiaiThuongKhoaHocCongNgheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
