/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabViewQuaTrinhCongTacComponent } from './tab-view-qua-trinh-cong-tac.component';

describe('TabViewQuaTrinhCongTacComponent', () => {
  let component: TabViewQuaTrinhCongTacComponent;
  let fixture: ComponentFixture<TabViewQuaTrinhCongTacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewQuaTrinhCongTacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewQuaTrinhCongTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
