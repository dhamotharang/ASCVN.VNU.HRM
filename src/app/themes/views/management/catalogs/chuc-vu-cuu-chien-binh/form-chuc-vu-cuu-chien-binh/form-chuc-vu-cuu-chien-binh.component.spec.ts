/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChucVuCuuChienBinhComponent } from './form-chuc-vu-cuu-chien-binh.component';

describe('FormChucVuCuuChienBinhComponent', () => {
  let component: FormChucVuCuuChienBinhComponent;
  let fixture: ComponentFixture<FormChucVuCuuChienBinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChucVuCuuChienBinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChucVuCuuChienBinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
