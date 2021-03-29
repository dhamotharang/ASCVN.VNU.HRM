/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DanhSachSanPhamKhcnComponent } from './danh-sach-san-pham-khcn.component';

describe('DanhSachSanPhamKhcnComponent', () => {
  let component: DanhSachSanPhamKhcnComponent;
  let fixture: ComponentFixture<DanhSachSanPhamKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachSanPhamKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachSanPhamKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
