/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThemNhanSuComponent } from './form-them-nhan-su.component';

describe('FormThemNhanSuComponent', () => {
  let component: FormThemNhanSuComponent;
  let fixture: ComponentFixture<FormThemNhanSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThemNhanSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThemNhanSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
