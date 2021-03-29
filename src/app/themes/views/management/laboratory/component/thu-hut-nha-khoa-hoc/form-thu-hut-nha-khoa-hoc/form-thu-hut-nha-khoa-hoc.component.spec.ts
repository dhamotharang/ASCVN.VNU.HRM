/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThuHutNhaKhoaHocComponent } from './form-thu-hut-nha-khoa-hoc.component';

describe('FormThuHutNhaKhoaHocComponent', () => {
  let component: FormThuHutNhaKhoaHocComponent;
  let fixture: ComponentFixture<FormThuHutNhaKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThuHutNhaKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThuHutNhaKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
