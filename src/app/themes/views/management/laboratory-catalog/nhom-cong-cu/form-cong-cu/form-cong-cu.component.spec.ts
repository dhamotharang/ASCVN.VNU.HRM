/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormCongCuComponent } from './form-cong-cu.component';

describe('FormCongCuComponent', () => {
  let component: FormCongCuComponent;
  let fixture: ComponentFixture<FormCongCuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCongCuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCongCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
