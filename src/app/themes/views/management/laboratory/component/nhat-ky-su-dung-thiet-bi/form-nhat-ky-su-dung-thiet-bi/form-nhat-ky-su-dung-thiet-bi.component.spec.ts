/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhatKySuDungThietBiComponent } from './form-nhat-ky-su-dung-thiet-bi.component';

describe('FormNhatKySuDungThietBiComponent', () => {
  let component: FormNhatKySuDungThietBiComponent;
  let fixture: ComponentFixture<FormNhatKySuDungThietBiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNhatKySuDungThietBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNhatKySuDungThietBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
