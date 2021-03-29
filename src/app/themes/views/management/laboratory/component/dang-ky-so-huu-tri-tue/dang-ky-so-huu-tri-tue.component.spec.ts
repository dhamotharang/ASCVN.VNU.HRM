/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DangKySoHuuTriTueComponent } from './dang-ky-so-huu-tri-tue.component';

describe('DangKySoHuuTriTueComponent', () => {
  let component: DangKySoHuuTriTueComponent;
  let fixture: ComponentFixture<DangKySoHuuTriTueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangKySoHuuTriTueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangKySoHuuTriTueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
