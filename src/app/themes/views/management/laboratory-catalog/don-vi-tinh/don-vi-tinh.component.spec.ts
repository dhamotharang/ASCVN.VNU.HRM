/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DonViTinhComponent } from './don-vi-tinh.component';

describe('DonViTinhComponent', () => {
  let component: DonViTinhComponent;
  let fixture: ComponentFixture<DonViTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonViTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonViTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
