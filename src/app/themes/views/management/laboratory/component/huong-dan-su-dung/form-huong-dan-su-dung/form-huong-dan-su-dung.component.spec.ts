/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormHuongDanSuDungComponent } from './form-huong-dan-su-dung.component';

describe('FormHuongDanSuDungComponent', () => {
  let component: FormHuongDanSuDungComponent;
  let fixture: ComponentFixture<FormHuongDanSuDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHuongDanSuDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHuongDanSuDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
