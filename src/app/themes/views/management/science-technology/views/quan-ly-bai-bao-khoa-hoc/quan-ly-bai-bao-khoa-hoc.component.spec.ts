/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyBaiBaoKhoaHocComponent } from './quan-ly-bai-bao-khoa-hoc.component';

describe('QuanLyBaiBaoKhoaHocComponent', () => {
  let component: QuanLyBaiBaoKhoaHocComponent;
  let fixture: ComponentFixture<QuanLyBaiBaoKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyBaiBaoKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyBaiBaoKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
