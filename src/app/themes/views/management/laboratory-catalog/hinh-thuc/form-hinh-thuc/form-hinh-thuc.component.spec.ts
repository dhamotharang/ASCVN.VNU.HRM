/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormHinhThucComponent } from './form-hinh-thuc.component';

describe('FormHinhThucComponent', () => {
  let component: FormHinhThucComponent;
  let fixture: ComponentFixture<FormHinhThucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHinhThucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHinhThucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
