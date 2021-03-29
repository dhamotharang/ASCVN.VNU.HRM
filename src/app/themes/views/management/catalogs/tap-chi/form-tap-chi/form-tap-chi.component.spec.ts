/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTapChiComponent } from './form-tap-chi.component';

describe('FormTapChiComponent', () => {
  let component: FormTapChiComponent;
  let fixture: ComponentFixture<FormTapChiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTapChiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTapChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
