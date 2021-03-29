/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabViewThongTinTuyenDungComponent } from './tab-view-thong-tin-tuyen-dung.component';

describe('TabViewThongTinTuyenDungComponent', () => {
  let component: TabViewThongTinTuyenDungComponent;
  let fixture: ComponentFixture<TabViewThongTinTuyenDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewThongTinTuyenDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewThongTinTuyenDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
