/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyHopDongKhaiThacComponent } from './quan-ly-hop-dong-khai-thac.component';

describe('QuanLyHopDongKhaiThacComponent', () => {
  let component: QuanLyHopDongKhaiThacComponent;
  let fixture: ComponentFixture<QuanLyHopDongKhaiThacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyHopDongKhaiThacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyHopDongKhaiThacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
