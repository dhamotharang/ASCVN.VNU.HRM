/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuyetDinhTuyenDungComponent } from './quyet-dinh-tuyen-dung.component';

describe('QuyetDinhTuyenDungComponent', () => {
  let component: QuyetDinhTuyenDungComponent;
  let fixture: ComponentFixture<QuyetDinhTuyenDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyetDinhTuyenDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyetDinhTuyenDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
