/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyMangThietBiRaNgoaiComponent } from './quan-ly-mang-thiet-bi-ra-ngoai.component';

describe('QuanLyMangThietBiRaNgoaiComponent', () => {
  let component: QuanLyMangThietBiRaNgoaiComponent;
  let fixture: ComponentFixture<QuanLyMangThietBiRaNgoaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyMangThietBiRaNgoaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyMangThietBiRaNgoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
