/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrangThaiDangKyPhongComponent } from './trang-thai-dang-ky-phong.component';

describe('TrangThaiDangKyPhongComponent', () => {
  let component: TrangThaiDangKyPhongComponent;
  let fixture: ComponentFixture<TrangThaiDangKyPhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangThaiDangKyPhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangThaiDangKyPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
