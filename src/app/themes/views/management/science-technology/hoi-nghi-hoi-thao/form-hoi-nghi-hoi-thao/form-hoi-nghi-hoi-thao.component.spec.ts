/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormHoiNghiHoiThaoComponent } from './form-hoi-nghi-hoi-thao.component';

describe('FormHoiNghiHoiThaoComponent', () => {
  let component: FormHoiNghiHoiThaoComponent;
  let fixture: ComponentFixture<FormHoiNghiHoiThaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHoiNghiHoiThaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHoiNghiHoiThaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
