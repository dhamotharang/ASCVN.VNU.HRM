/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDuAnDauTuComponent } from './form-du-an-dau-tu.component';

describe('FormDuAnDauTuComponent', () => {
  let component: FormDuAnDauTuComponent;
  let fixture: ComponentFixture<FormDuAnDauTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDuAnDauTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDuAnDauTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
