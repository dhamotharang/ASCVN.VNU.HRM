/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LapThongBaoKeHoachComponent } from './lap-thong-bao-ke-hoach.component';

describe('LapThongBaoKeHoachComponent', () => {
  let component: LapThongBaoKeHoachComponent;
  let fixture: ComponentFixture<LapThongBaoKeHoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapThongBaoKeHoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapThongBaoKeHoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
