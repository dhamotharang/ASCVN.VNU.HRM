/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CapQuyetDinhComponent } from './cap-quyet-dinh.component';

describe('CapQuyetDinhComponent', () => {
  let component: CapQuyetDinhComponent;
  let fixture: ComponentFixture<CapQuyetDinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapQuyetDinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapQuyetDinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
