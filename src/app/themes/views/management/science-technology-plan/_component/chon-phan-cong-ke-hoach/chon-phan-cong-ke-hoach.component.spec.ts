/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChonPhanCongKeHoachComponent } from './chon-phan-cong-ke-hoach.component';

describe('ChonPhanCongKeHoachComponent', () => {
  let component: ChonPhanCongKeHoachComponent;
  let fixture: ComponentFixture<ChonPhanCongKeHoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonPhanCongKeHoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonPhanCongKeHoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
