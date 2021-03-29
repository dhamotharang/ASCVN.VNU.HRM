/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTinhTrangThietBiComponent } from './form-tinh-trang-thiet-bi.component';

describe('FormTinhTrangThietBiComponent', () => {
  let component: FormTinhTrangThietBiComponent;
  let fixture: ComponentFixture<FormTinhTrangThietBiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTinhTrangThietBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTinhTrangThietBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
