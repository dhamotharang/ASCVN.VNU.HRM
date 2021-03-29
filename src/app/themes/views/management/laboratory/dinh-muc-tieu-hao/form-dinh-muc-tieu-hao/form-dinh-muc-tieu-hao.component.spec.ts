/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDinhMucTieuHaoComponent } from './form-dinh-muc-tieu-hao.component';

describe('FormDinhMucTieuHaoComponent', () => {
  let component: FormDinhMucTieuHaoComponent;
  let fixture: ComponentFixture<FormDinhMucTieuHaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDinhMucTieuHaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDinhMucTieuHaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
