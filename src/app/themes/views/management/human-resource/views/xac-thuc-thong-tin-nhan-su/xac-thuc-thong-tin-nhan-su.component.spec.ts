/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XacThucThongTinNhanSuComponent } from './xac-thuc-thong-tin-nhan-su.component';

describe('XacThucThongTinNhanSuComponent', () => {
  let component: XacThucThongTinNhanSuComponent;
  let fixture: ComponentFixture<XacThucThongTinNhanSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XacThucThongTinNhanSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XacThucThongTinNhanSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
