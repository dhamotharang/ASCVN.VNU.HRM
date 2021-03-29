/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XinYKienComponent } from './xin-y-kien.component';

describe('XinYKienComponent', () => {
  let component: XinYKienComponent;
  let fixture: ComponentFixture<XinYKienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XinYKienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XinYKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
