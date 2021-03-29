/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoiNghiComponent } from './hoi-nghi.component';

describe('HoiNghiComponent', () => {
  let component: HoiNghiComponent;
  let fixture: ComponentFixture<HoiNghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiNghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiNghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
