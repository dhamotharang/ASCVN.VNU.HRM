/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhatKySuDungThietBiComponent } from './nhat-ky-su-dung-thiet-bi.component';

describe('NhatKySuDungThietBiComponent', () => {
  let component: NhatKySuDungThietBiComponent;
  let fixture: ComponentFixture<NhatKySuDungThietBiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhatKySuDungThietBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhatKySuDungThietBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
