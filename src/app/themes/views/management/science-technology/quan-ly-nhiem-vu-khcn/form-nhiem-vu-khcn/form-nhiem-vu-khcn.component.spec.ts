/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhiemVuKhcnComponent } from './form-nhiem-vu-khcn.component';

describe('FormNhiemVuKhcnComponent', () => {
  let component: FormNhiemVuKhcnComponent;
  let fixture: ComponentFixture<FormNhiemVuKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNhiemVuKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNhiemVuKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
