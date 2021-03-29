/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MangRaNgoaiComponent } from './mang-ra-ngoai.component';

describe('MangRaNgoaiComponent', () => {
  let component: MangRaNgoaiComponent;
  let fixture: ComponentFixture<MangRaNgoaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangRaNgoaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangRaNgoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
