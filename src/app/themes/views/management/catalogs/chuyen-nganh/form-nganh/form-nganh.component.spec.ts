/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNganhComponent } from './form-nganh.component';

describe('FormNganhComponent', () => {
  let component: FormNganhComponent;
  let fixture: ComponentFixture<FormNganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
