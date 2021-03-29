/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyBaoCaoKhoaHocComponent } from './quan-ly-bao-cao-khoa-hoc.component';

describe('QuanLyBaoCaoKhoaHocComponent', () => {
  let component: QuanLyBaoCaoKhoaHocComponent;
  let fixture: ComponentFixture<QuanLyBaoCaoKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyBaoCaoKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyBaoCaoKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
