/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChucVuDangComponent } from './chuc-vu-dang.component';

describe('ChucVuDangComponent', () => {
  let component: ChucVuDangComponent;
  let fixture: ComponentFixture<ChucVuDangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChucVuDangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChucVuDangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
