/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HuongDanSuDungComponent } from './huong-dan-su-dung.component';

describe('HuongDanSuDungComponent', () => {
  let component: HuongDanSuDungComponent;
  let fixture: ComponentFixture<HuongDanSuDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuongDanSuDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuongDanSuDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
