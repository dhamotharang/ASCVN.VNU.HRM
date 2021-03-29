/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormBaiBaoKhoaHocComponent } from './form-bai-bao-khoa-hoc.component';

describe('FormBaiBaoKhoaHocComponent', () => {
  let component: FormBaiBaoKhoaHocComponent;
  let fixture: ComponentFixture<FormBaiBaoKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBaiBaoKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBaiBaoKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
