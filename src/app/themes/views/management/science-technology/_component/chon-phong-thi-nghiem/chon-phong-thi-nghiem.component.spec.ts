/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChonPhongThiNghiemComponent } from './chon-phong-thi-nghiem.component';

describe('ChonPhongThiNghiemComponent', () => {
  let component: ChonPhongThiNghiemComponent;
  let fixture: ComponentFixture<ChonPhongThiNghiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonPhongThiNghiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonPhongThiNghiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
