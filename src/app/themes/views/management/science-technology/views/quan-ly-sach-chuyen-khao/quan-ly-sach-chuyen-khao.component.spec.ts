/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLySachChuyenKhaoComponent } from './quan-ly-sach-chuyen-khao.component';

describe('QuanLySachChuyenKhaoComponent', () => {
  let component: QuanLySachChuyenKhaoComponent;
  let fixture: ComponentFixture<QuanLySachChuyenKhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLySachChuyenKhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLySachChuyenKhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
