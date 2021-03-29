/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThanhVienNgoaiKhcnComponent } from './thanh-vien-ngoai-khcn.component';

describe('ThanhVienNgoaiKhcnComponent', () => {
  let component: ThanhVienNgoaiKhcnComponent;
  let fixture: ComponentFixture<ThanhVienNgoaiKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhVienNgoaiKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhVienNgoaiKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
