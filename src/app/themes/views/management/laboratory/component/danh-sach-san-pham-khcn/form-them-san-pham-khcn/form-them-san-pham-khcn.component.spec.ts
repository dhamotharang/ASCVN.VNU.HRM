/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThemSanPhamKhcnComponent } from './form-them-san-pham-khcn.component';

describe('FormThemSanPhamKhcnComponent', () => {
  let component: FormThemSanPhamKhcnComponent;
  let fixture: ComponentFixture<FormThemSanPhamKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThemSanPhamKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThemSanPhamKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
