/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormQdPcHdTapSuComponent } from './form-qd-pc-hd-tap-su.component';

describe('FormQdPcHdTapSuComponent', () => {
  let component: FormQdPcHdTapSuComponent;
  let fixture: ComponentFixture<FormQdPcHdTapSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQdPcHdTapSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQdPcHdTapSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
