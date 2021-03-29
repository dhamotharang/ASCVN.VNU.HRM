/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuyetDinhChamDutHdLaoDongComponent } from './quyet-dinh-cham-dut-hd-lao-dong.component';

describe('QuyetDinhChamDutHdLaoDongComponent', () => {
  let component: QuyetDinhChamDutHdLaoDongComponent;
  let fixture: ComponentFixture<QuyetDinhChamDutHdLaoDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyetDinhChamDutHdLaoDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyetDinhChamDutHdLaoDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
