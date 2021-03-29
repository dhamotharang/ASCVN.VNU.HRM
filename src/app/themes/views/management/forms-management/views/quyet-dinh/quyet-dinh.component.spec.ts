/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuyetDinhComponent } from './quyet-dinh.component';

describe('QuyetDinhComponent', () => {
  let component: QuyetDinhComponent;
  let fixture: ComponentFixture<QuyetDinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyetDinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyetDinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
