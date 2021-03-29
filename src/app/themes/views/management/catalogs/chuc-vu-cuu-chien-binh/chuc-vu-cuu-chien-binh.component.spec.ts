/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChucVuCuuChienBinhComponent } from './chuc-vu-cuu-chien-binh.component';

describe('ChucVuCuuChienBinhComponent', () => {
  let component: ChucVuCuuChienBinhComponent;
  let fixture: ComponentFixture<ChucVuCuuChienBinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChucVuCuuChienBinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChucVuCuuChienBinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
