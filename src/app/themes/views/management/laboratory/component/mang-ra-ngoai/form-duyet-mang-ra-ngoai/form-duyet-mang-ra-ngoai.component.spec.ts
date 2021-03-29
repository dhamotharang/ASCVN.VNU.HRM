/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDuyetMangRaNgoaiComponent } from './form-duyet-mang-ra-ngoai.component';

describe('FormDuyetMangRaNgoaiComponent', () => {
  let component: FormDuyetMangRaNgoaiComponent;
  let fixture: ComponentFixture<FormDuyetMangRaNgoaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDuyetMangRaNgoaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDuyetMangRaNgoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
