/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhapYKienComponent } from './nhap-y-kien.component';

describe('NhapYKienComponent', () => {
  let component: NhapYKienComponent;
  let fixture: ComponentFixture<NhapYKienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapYKienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapYKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
