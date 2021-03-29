/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormHoiNghiComponent } from './form-hoi-nghi.component';

describe('FormHoiNghiComponent', () => {
  let component: FormHoiNghiComponent;
  let fixture: ComponentFixture<FormHoiNghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHoiNghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHoiNghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
