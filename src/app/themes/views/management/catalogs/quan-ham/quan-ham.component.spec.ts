/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanHamComponent } from './quan-ham.component';

describe('QuanHamComponent', () => {
  let component: QuanHamComponent;
  let fixture: ComponentFixture<QuanHamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanHamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanHamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
