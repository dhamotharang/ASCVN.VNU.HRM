/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabViewChinhTriXaHoiComponent } from './tab-view-chinh-tri-xa-hoi.component';

describe('TabViewChinhTriXaHoiComponent', () => {
  let component: TabViewChinhTriXaHoiComponent;
  let fixture: ComponentFixture<TabViewChinhTriXaHoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewChinhTriXaHoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewChinhTriXaHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
