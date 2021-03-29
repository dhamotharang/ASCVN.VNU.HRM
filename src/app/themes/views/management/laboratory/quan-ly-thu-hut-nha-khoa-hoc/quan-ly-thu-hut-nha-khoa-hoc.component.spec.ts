/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyThuHutNhaKhoaHocComponent } from './quan-ly-thu-hut-nha-khoa-hoc.component';

describe('QuanLyThuHutNhaKhoaHocComponent', () => {
  let component: QuanLyThuHutNhaKhoaHocComponent;
  let fixture: ComponentFixture<QuanLyThuHutNhaKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyThuHutNhaKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyThuHutNhaKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
