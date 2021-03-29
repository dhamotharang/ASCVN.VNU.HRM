/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThietBiPhuThuocComponent } from './form-thiet-bi-phu-thuoc.component';

describe('FormThietBiPhuThuocComponent', () => {
  let component: FormThietBiPhuThuocComponent;
  let fixture: ComponentFixture<FormThietBiPhuThuocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThietBiPhuThuocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThietBiPhuThuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
