/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TinhTrangSucKhoeComponent } from './tinh-trang-suc-khoe.component';

describe('TinhTrangSucKhoeComponent', () => {
  let component: TinhTrangSucKhoeComponent;
  let fixture: ComponentFixture<TinhTrangSucKhoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhTrangSucKhoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhTrangSucKhoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
