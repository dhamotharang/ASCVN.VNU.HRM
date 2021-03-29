/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChonThanhVienNgoaiComponent } from './chon-thanh-vien-ngoai.component';

describe('ChonThanhVienNgoaiComponent', () => {
  let component: ChonThanhVienNgoaiComponent;
  let fixture: ComponentFixture<ChonThanhVienNgoaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonThanhVienNgoaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonThanhVienNgoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
