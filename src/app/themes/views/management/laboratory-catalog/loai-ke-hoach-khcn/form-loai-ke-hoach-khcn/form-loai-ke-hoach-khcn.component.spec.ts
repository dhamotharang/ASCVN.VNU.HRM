/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormLoaiKeHoachKhcnComponent } from './form-loai-ke-hoach-khcn.component';

describe('FormLoaiKeHoachKhcnComponent', () => {
  let component: FormLoaiKeHoachKhcnComponent;
  let fixture: ComponentFixture<FormLoaiKeHoachKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoaiKeHoachKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoaiKeHoachKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
