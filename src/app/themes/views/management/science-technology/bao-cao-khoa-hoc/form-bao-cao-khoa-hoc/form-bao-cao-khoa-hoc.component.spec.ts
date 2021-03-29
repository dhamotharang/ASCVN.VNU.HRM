/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormBaoCaoKhoaHocComponent } from './form-bao-cao-khoa-hoc.component';

describe('FormBaoCaoKhoaHocComponent', () => {
  let component: FormBaoCaoKhoaHocComponent;
  let fixture: ComponentFixture<FormBaoCaoKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBaoCaoKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBaoCaoKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
