/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoaiBaoCaoKhoaHocComponent } from './loai-bao-cao-khoa-hoc.component';

describe('LoaiBaoCaoKhoaHocComponent', () => {
  let component: LoaiBaoCaoKhoaHocComponent;
  let fixture: ComponentFixture<LoaiBaoCaoKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiBaoCaoKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiBaoCaoKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
