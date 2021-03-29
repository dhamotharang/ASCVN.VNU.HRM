/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormCapNhatNhanSuComponent } from './form-cap-nhat-nhan-su.component';

describe('FormCapNhatNhanSuComponent', () => {
  let component: FormCapNhatNhanSuComponent;
  let fixture: ComponentFixture<FormCapNhatNhanSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCapNhatNhanSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCapNhatNhanSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
