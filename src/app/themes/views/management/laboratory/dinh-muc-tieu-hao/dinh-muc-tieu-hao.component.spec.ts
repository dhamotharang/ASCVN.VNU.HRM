/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DinhMucTieuHaoComponent } from './dinh-muc-tieu-hao.component';

describe('DinhMucTieuHaoComponent', () => {
  let component: DinhMucTieuHaoComponent;
  let fixture: ComponentFixture<DinhMucTieuHaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhMucTieuHaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhMucTieuHaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
