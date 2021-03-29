/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SachChuyenKhaoComponent } from './sach-chuyen-khao.component';

describe('SachChuyenKhaoComponent', () => {
  let component: SachChuyenKhaoComponent;
  let fixture: ComponentFixture<SachChuyenKhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SachChuyenKhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SachChuyenKhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
