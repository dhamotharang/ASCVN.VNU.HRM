/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormLoaiHoiThaoHoiNghiComponent } from './form-loai-hoi-thao-hoi-nghi.component';

describe('FormLoaiHoiThaoHoiNghiComponent', () => {
  let component: FormLoaiHoiThaoHoiNghiComponent;
  let fixture: ComponentFixture<FormLoaiHoiThaoHoiNghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoaiHoiThaoHoiNghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoaiHoiThaoHoiNghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
