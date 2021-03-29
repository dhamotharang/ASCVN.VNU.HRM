/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabViewThongTinSucKhoeComponent } from './tab-view-thong-tin-suc-khoe.component';

describe('TabViewThongTinSucKhoeComponent', () => {
  let component: TabViewThongTinSucKhoeComponent;
  let fixture: ComponentFixture<TabViewThongTinSucKhoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewThongTinSucKhoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewThongTinSucKhoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
