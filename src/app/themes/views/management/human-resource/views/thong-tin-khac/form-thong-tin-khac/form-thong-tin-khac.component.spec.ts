/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThongTinKhacComponent } from './form-thong-tin-khac.component';

describe('FormThongTinKhacComponent', () => {
  let component: FormThongTinKhacComponent;
  let fixture: ComponentFixture<FormThongTinKhacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThongTinKhacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThongTinKhacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
