/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DanhSachThietBiPhuThuocComponent } from './danh-sach-thiet-bi-phu-thuoc.component';

describe('DanhSachThietBiPhuThuocComponent', () => {
  let component: DanhSachThietBiPhuThuocComponent;
  let fixture: ComponentFixture<DanhSachThietBiPhuThuocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachThietBiPhuThuocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachThietBiPhuThuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
