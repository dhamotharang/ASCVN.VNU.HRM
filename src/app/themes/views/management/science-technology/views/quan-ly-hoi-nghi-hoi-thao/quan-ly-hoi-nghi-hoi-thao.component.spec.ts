/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyHoiNghiHoiThaoComponent } from './quan-ly-hoi-nghi-hoi-thao.component';

describe('QuanLyHoiNghiHoiThaoComponent', () => {
  let component: QuanLyHoiNghiHoiThaoComponent;
  let fixture: ComponentFixture<QuanLyHoiNghiHoiThaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyHoiNghiHoiThaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyHoiNghiHoiThaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
