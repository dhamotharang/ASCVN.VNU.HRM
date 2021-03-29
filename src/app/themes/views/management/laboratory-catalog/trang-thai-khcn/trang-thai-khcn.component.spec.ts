/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrangThaiKhcnComponent } from './trang-thai-khcn.component';

describe('TrangThaiKhcnComponent', () => {
  let component: TrangThaiKhcnComponent;
  let fixture: ComponentFixture<TrangThaiKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangThaiKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangThaiKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
