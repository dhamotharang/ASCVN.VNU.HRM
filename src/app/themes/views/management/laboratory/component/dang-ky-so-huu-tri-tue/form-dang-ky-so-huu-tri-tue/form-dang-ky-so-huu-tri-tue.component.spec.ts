/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDangKySoHuuTriTueComponent } from './form-dang-ky-so-huu-tri-tue.component';

describe('FormDangKySoHuuTriTueComponent', () => {
  let component: FormDangKySoHuuTriTueComponent;
  let fixture: ComponentFixture<FormDangKySoHuuTriTueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDangKySoHuuTriTueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDangKySoHuuTriTueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
