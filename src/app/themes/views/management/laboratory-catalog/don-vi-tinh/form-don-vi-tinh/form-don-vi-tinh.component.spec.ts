/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDonViTinhComponent } from './form-don-vi-tinh.component';

describe('FormDonViTinhComponent', () => {
  let component: FormDonViTinhComponent;
  let fixture: ComponentFixture<FormDonViTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDonViTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDonViTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
