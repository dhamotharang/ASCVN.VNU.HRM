/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DinhMucVatTuTieuHaoComponent } from './dinh-muc-vat-tu-tieu-hao.component';

describe('DinhMucVatTuTieuHaoComponent', () => {
  let component: DinhMucVatTuTieuHaoComponent;
  let fixture: ComponentFixture<DinhMucVatTuTieuHaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhMucVatTuTieuHaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhMucVatTuTieuHaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
