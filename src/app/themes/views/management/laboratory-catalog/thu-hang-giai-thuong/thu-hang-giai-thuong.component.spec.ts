/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThuHangGiaiThuongComponent } from './thu-hang-giai-thuong.component';

describe('ThuHangGiaiThuongComponent', () => {
  let component: ThuHangGiaiThuongComponent;
  let fixture: ComponentFixture<ThuHangGiaiThuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuHangGiaiThuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuHangGiaiThuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
