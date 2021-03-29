/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XemDanhMucThayDoiThongTinComponent } from './xem-danh-muc-thay-doi-thong-tin.component';

describe('XemDanhMucThayDoiThongTinComponent', () => {
  let component: XemDanhMucThayDoiThongTinComponent;
  let fixture: ComponentFixture<XemDanhMucThayDoiThongTinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemDanhMucThayDoiThongTinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemDanhMucThayDoiThongTinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
