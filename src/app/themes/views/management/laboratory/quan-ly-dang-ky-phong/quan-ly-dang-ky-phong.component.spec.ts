/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyDangKyPhongComponent } from './quan-ly-dang-ky-phong.component';

describe('QuanLyDangKyPhongComponent', () => {
  let component: QuanLyDangKyPhongComponent;
  let fixture: ComponentFixture<QuanLyDangKyPhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyDangKyPhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyDangKyPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
