/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabViewQuanHeGiaDinhComponent } from './tab-view-quan-he-gia-dinh.component';

describe('TabViewQuanHeGiaDinhComponent', () => {
  let component: TabViewQuanHeGiaDinhComponent;
  let fixture: ComponentFixture<TabViewQuanHeGiaDinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewQuanHeGiaDinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewQuanHeGiaDinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
