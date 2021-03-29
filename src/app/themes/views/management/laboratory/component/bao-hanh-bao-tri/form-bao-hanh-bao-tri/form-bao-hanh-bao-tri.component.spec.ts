/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormBaoHanhBaoTriComponent } from './form-bao-hanh-bao-tri.component';

describe('FormBaoHanhBaoTriComponent', () => {
  let component: FormBaoHanhBaoTriComponent;
  let fixture: ComponentFixture<FormBaoHanhBaoTriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBaoHanhBaoTriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBaoHanhBaoTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
