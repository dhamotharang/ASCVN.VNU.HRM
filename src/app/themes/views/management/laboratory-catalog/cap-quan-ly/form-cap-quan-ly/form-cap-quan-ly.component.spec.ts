/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormCapQuanLyComponent } from './form-cap-quan-ly.component';

describe('FormCapQuanLyComponent', () => {
  let component: FormCapQuanLyComponent;
  let fixture: ComponentFixture<FormCapQuanLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCapQuanLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCapQuanLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
