/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PtnUploadComponent } from './ptn-upload.component';

describe('AscUploadComponent', () => {
  let component: PtnUploadComponent;
  let fixture: ComponentFixture<PtnUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PtnUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtnUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
