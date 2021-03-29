/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhapHoSoTuyenDungComponent } from './form-nhap-ho-so-tuyen-dung.component';

describe('FormNhapHoSoTuyenDungComponent', () => {
  let component: FormNhapHoSoTuyenDungComponent;
  let fixture: ComponentFixture<FormNhapHoSoTuyenDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNhapHoSoTuyenDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNhapHoSoTuyenDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
