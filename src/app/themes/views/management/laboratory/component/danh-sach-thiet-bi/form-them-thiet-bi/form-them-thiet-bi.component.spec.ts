/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThemThietBiComponent } from './form-them-thiet-bi.component';

describe('FormThemThietBiComponent', () => {
  let component: FormThemThietBiComponent;
  let fixture: ComponentFixture<FormThemThietBiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThemThietBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThemThietBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
