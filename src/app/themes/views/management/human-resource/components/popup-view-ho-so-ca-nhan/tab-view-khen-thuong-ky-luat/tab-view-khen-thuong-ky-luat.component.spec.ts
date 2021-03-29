/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabViewKhenThuongKyLuatComponent } from './tab-view-khen-thuong-ky-luat.component';

describe('TabViewKhenThuongKyLuatComponent', () => {
  let component: TabViewKhenThuongKyLuatComponent;
  let fixture: ComponentFixture<TabViewKhenThuongKyLuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewKhenThuongKyLuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewKhenThuongKyLuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
