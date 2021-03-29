/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListCongTrinhKhoaHocComponent } from './list-cong-trinh-khoa-hoc.component';

describe('ListCongTrinhKhoaHocComponent', () => {
  let component: ListCongTrinhKhoaHocComponent;
  let fixture: ComponentFixture<ListCongTrinhKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCongTrinhKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCongTrinhKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
