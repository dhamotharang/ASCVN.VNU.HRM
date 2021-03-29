/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDinhMucVatTuTieuHaoComponent } from './form-dinh-muc-vat-tu-tieu-hao.component';

describe('FormDinhMucVatTuTieuHaoComponent', () => {
  let component: FormDinhMucVatTuTieuHaoComponent;
  let fixture: ComponentFixture<FormDinhMucVatTuTieuHaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDinhMucVatTuTieuHaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDinhMucVatTuTieuHaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
