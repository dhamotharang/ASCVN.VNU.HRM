/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThongTinNhanSuChungComponent } from './form-thong-tin-nhan-su-chung.component';

describe('FormThongTinNhanSuChungComponent', () => {
  let component: FormThongTinNhanSuChungComponent;
  let fixture: ComponentFixture<FormThongTinNhanSuChungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThongTinNhanSuChungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThongTinNhanSuChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
