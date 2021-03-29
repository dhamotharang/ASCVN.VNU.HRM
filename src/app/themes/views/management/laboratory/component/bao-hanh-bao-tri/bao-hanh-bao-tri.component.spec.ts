/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaoHanhBaoTriComponent } from './bao-hanh-bao-tri.component';

describe('BaoHanhBaoTriComponent', () => {
  let component: BaoHanhBaoTriComponent;
  let fixture: ComponentFixture<BaoHanhBaoTriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoHanhBaoTriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoHanhBaoTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
