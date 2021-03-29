/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoiNghiHoiThaoComponent } from './hoi-nghi-hoi-thao.component';

describe('HoiNghiHoiThaoComponent', () => {
  let component: HoiNghiHoiThaoComponent;
  let fixture: ComponentFixture<HoiNghiHoiThaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiNghiHoiThaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiNghiHoiThaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
