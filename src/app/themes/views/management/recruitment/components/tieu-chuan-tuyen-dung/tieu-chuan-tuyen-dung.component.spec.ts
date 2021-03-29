/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TieuChuanTuyenDungComponent } from './tieu-chuan-tuyen-dung.component';

describe('TieuChuanTuyenDungComponent', () => {
  let component: TieuChuanTuyenDungComponent;
  let fixture: ComponentFixture<TieuChuanTuyenDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuChuanTuyenDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuChuanTuyenDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
