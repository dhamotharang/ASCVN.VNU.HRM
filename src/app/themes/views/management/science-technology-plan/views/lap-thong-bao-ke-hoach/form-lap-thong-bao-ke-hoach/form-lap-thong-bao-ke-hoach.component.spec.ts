/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormLapThongBaoKeHoachComponent } from './form-lap-thong-bao-ke-hoach.component';

describe('FormLapThongBaoKeHoachComponent', () => {
  let component: FormLapThongBaoKeHoachComponent;
  let fixture: ComponentFixture<FormLapThongBaoKeHoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLapThongBaoKeHoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLapThongBaoKeHoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
