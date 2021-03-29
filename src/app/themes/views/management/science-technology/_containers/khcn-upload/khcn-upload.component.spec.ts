/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhcnUploadComponent } from './khcn-upload.component';

describe('KhcnUploadComponent', () => {
  let component: KhcnUploadComponent;
  let fixture: ComponentFixture<KhcnUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhcnUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhcnUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
