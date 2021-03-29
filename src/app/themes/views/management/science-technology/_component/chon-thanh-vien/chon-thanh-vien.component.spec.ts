/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChonThanhVienComponent } from './chon-thanh-vien.component';

describe('ChonThanhVienComponent', () => {
  let component: ChonThanhVienComponent;
  let fixture: ComponentFixture<ChonThanhVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonThanhVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonThanhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
