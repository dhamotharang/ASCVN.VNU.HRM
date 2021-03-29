/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChucVuCongDoanComponent } from './chuc-vu-cong-doan.component';

describe('ChucVuCongDoanComponent', () => {
  let component: ChucVuCongDoanComponent;
  let fixture: ComponentFixture<ChucVuCongDoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChucVuCongDoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChucVuCongDoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
