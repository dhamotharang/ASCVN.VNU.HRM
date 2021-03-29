/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DuyetChapDutHdldComponent } from './duyet-cham-dut-hdld.component';

describe('DuyetChapDutHdldComponent', () => {
  let component: DuyetChapDutHdldComponent;
  let fixture: ComponentFixture<DuyetChapDutHdldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuyetChapDutHdldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuyetChapDutHdldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
