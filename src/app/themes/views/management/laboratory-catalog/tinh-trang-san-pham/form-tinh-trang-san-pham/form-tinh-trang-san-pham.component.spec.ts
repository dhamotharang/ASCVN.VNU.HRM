/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTinhTrangSanPhamComponent } from './form-tinh-trang-san-pham.component';

describe('FormTinhTrangSanPhamComponent', () => {
  let component: FormTinhTrangSanPhamComponent;
  let fixture: ComponentFixture<FormTinhTrangSanPhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTinhTrangSanPhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTinhTrangSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
