/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThemDoiNguCanBoComponent } from './form-them-doi-ngu-can-bo.component';

describe('FormThemDoiNguCanBoComponent', () => {
  let component: FormThemDoiNguCanBoComponent;
  let fixture: ComponentFixture<FormThemDoiNguCanBoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThemDoiNguCanBoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThemDoiNguCanBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
