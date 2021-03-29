/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormLoaiThuongBinhComponent } from './form-loai-thuong-binh.component';

describe('FormLoaiThuongBinhComponent', () => {
  let component: FormLoaiThuongBinhComponent;
  let fixture: ComponentFixture<FormLoaiThuongBinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoaiThuongBinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoaiThuongBinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
