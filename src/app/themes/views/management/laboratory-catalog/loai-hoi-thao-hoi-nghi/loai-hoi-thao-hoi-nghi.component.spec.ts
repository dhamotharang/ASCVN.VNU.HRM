/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoaiHoiThaoHoiNghiComponent } from './loai-hoi-thao-hoi-nghi.component';

describe('LoaiHoiThaoHoiNghiComponent', () => {
  let component: LoaiHoiThaoHoiNghiComponent;
  let fixture: ComponentFixture<LoaiHoiThaoHoiNghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiHoiThaoHoiNghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiHoiThaoHoiNghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
