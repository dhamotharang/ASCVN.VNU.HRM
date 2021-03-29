/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DanhSachChonThietBiNhatKyComponent } from './danh-sach-chon-thiet-bi-nhat-ky.component';

describe('DanhSachChonThietBiNhatKyComponent', () => {
  let component: DanhSachChonThietBiNhatKyComponent;
  let fixture: ComponentFixture<DanhSachChonThietBiNhatKyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachChonThietBiNhatKyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachChonThietBiNhatKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
