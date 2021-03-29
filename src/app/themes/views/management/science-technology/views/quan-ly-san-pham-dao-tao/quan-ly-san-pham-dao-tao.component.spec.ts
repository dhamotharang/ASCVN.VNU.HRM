/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLySanPhamDaoTaoComponent } from './quan-ly-san-pham-dao-tao.component';

describe('QuanLySanPhamDaoTaoComponent', () => {
  let component: QuanLySanPhamDaoTaoComponent;
  let fixture: ComponentFixture<QuanLySanPhamDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLySanPhamDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLySanPhamDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
