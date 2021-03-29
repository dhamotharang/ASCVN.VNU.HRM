/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LichSuDuyetDangKyComponent } from './lich-su-duyet-dang-ky.component';

describe('LichSuDuyetDangKyComponent', () => {
  let component: LichSuDuyetDangKyComponent;
  let fixture: ComponentFixture<LichSuDuyetDangKyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichSuDuyetDangKyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichSuDuyetDangKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
