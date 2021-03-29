/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKyNangVanHanhComponent } from './form-ky-nang-van-hanh.component';

describe('FormKyNangVanHanhComponent', () => {
  let component: FormKyNangVanHanhComponent;
  let fixture: ComponentFixture<FormKyNangVanHanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKyNangVanHanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKyNangVanHanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
