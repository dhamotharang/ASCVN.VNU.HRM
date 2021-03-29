/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChonChuyenNganhComponent } from './chon-chuyen-nganh.component';

describe('ChonChuyenNganhComponent', () => {
  let component: ChonChuyenNganhComponent;
  let fixture: ComponentFixture<ChonChuyenNganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonChuyenNganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonChuyenNganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
