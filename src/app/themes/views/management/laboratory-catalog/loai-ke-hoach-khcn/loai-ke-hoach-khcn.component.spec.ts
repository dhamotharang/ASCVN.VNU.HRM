/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoaiKeHoachKhcnComponent } from './loai-ke-hoach-khcn.component';

describe('LoaiKeHoachKhcnComponent', () => {
  let component: LoaiKeHoachKhcnComponent;
  let fixture: ComponentFixture<LoaiKeHoachKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiKeHoachKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiKeHoachKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
