/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThuHangGiaiThuongComponent } from './form-thu-hang-giai-thuong.component';

describe('FormThuHangGiaiThuongComponent', () => {
  let component: FormThuHangGiaiThuongComponent;
  let fixture: ComponentFixture<FormThuHangGiaiThuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThuHangGiaiThuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThuHangGiaiThuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
