/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiaiThuongKhoaHocCongNgheComponent } from './giai-thuong-khoa-hoc-cong-nghe.component';

describe('GiaiThuongKhoaHocCongNgheComponent', () => {
  let component: GiaiThuongKhoaHocCongNgheComponent;
  let fixture: ComponentFixture<GiaiThuongKhoaHocCongNgheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaiThuongKhoaHocCongNgheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaiThuongKhoaHocCongNgheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
