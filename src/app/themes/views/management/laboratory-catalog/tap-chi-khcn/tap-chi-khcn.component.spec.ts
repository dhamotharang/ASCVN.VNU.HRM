/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TapChiKhcnComponent } from './tap-chi-khcn.component';

describe('TapChiKhcnComponent', () => {
  let component: TapChiKhcnComponent;
  let fixture: ComponentFixture<TapChiKhcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapChiKhcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapChiKhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
