/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhanQuyenPhuTrachComponent } from './phan-quyen-phu-trach.component';

describe('PhanQuyenPhuTrachComponent', () => {
  let component: PhanQuyenPhuTrachComponent;
  let fixture: ComponentFixture<PhanQuyenPhuTrachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanQuyenPhuTrachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanQuyenPhuTrachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
