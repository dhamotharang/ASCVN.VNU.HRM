/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MangThietBiRaNgoaiComponent } from './mang-thiet-bi-ra-ngoai.component';

describe('MangThietBiRaNgoaiComponent', () => {
  let component: MangThietBiRaNgoaiComponent;
  let fixture: ComponentFixture<MangThietBiRaNgoaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangThietBiRaNgoaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangThietBiRaNgoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
