/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhapHoSoTuyenDungComponent } from './nhap-ho-so-tuyen-dung.component';

describe('NhapHoSoTuyenDungComponent', () => {
  let component: NhapHoSoTuyenDungComponent;
  let fixture: ComponentFixture<NhapHoSoTuyenDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapHoSoTuyenDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapHoSoTuyenDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
