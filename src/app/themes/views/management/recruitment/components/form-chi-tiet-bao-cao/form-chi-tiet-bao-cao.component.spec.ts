/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChiTietBaoCaoComponent } from './form-chi-tiet-bao-cao.component';

describe('FormChiTietBaoCaoComponent', () => {
  let component: FormChiTietBaoCaoComponent;
  let fixture: ComponentFixture<FormChiTietBaoCaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChiTietBaoCaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChiTietBaoCaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
