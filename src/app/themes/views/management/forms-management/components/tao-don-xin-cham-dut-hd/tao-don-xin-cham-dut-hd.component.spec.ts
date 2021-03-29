/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaoDonXinChamDutHdComponent } from './tao-don-xin-cham-dut-hd.component';

describe('TaoDonXinChamDutHdComponent', () => {
  let component: TaoDonXinChamDutHdComponent;
  let fixture: ComponentFixture<TaoDonXinChamDutHdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoDonXinChamDutHdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoDonXinChamDutHdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
