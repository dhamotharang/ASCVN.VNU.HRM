/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormQuyetDinhChamDutHdldComponent } from './form-quyet-dinh-cham-dut-hdld.component';

describe('FormQuyetDinhChamDutHdldComponent', () => {
  let component: FormQuyetDinhChamDutHdldComponent;
  let fixture: ComponentFixture<FormQuyetDinhChamDutHdldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuyetDinhChamDutHdldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuyetDinhChamDutHdldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
