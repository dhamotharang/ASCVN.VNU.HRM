/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KyNangVanHanhComponent } from './ky-nang-van-hanh.component';

describe('KyNangVanHanhComponent', () => {
  let component: KyNangVanHanhComponent;
  let fixture: ComponentFixture<KyNangVanHanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyNangVanHanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyNangVanHanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
