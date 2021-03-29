/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTinhTrangSucKhoeComponent } from './form-tinh-trang-suc-khoe.component';

describe('FormTinhTrangSucKhoeComponent', () => {
  let component: FormTinhTrangSucKhoeComponent;
  let fixture: ComponentFixture<FormTinhTrangSucKhoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTinhTrangSucKhoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTinhTrangSucKhoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
