/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HopDongKhaiThacComponent } from './hop-dong-khai-thac.component';

describe('HopDongKhaiThacComponent', () => {
  let component: HopDongKhaiThacComponent;
  let fixture: ComponentFixture<HopDongKhaiThacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopDongKhaiThacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopDongKhaiThacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
