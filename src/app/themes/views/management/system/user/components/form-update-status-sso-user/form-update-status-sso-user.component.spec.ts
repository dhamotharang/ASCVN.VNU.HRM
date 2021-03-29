/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormUpdateStatusSsoUserComponent } from './form-update-status-sso-user.component';

describe('FormUpdateStatusSsoUserComponent', () => {
  let component: FormUpdateStatusSsoUserComponent;
  let fixture: ComponentFixture<FormUpdateStatusSsoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUpdateStatusSsoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateStatusSsoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
