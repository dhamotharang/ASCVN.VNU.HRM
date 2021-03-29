/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabViewTrinhDoChuyenMonComponent } from './tab-view-trinh-do-chuyen-mon.component';

describe('TabViewTrinhDoChuyenMonComponent', () => {
  let component: TabViewTrinhDoChuyenMonComponent;
  let fixture: ComponentFixture<TabViewTrinhDoChuyenMonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewTrinhDoChuyenMonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewTrinhDoChuyenMonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
