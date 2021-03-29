/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormLoaiBaoCaoKhoaHocComponent } from './form-loai-bao-cao-khoa-hoc.component';

describe('FormLoaiBaoCaoKhoaHocComponent', () => {
  let component: FormLoaiBaoCaoKhoaHocComponent;
  let fixture: ComponentFixture<FormLoaiBaoCaoKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoaiBaoCaoKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoaiBaoCaoKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
