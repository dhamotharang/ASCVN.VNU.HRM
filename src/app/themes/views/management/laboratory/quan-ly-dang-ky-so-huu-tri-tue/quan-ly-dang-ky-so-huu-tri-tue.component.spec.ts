/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyDangKySoHuuTriTueComponent } from './quan-ly-dang-ky-so-huu-tri-tue.component';

describe('QuanLyDangKySoHuuTriTueComponent', () => {
  let component: QuanLyDangKySoHuuTriTueComponent;
  let fixture: ComponentFixture<QuanLyDangKySoHuuTriTueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyDangKySoHuuTriTueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyDangKySoHuuTriTueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
