/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CapDoComponent } from './cap-do.component';

describe('CapDoComponent', () => {
  let component: CapDoComponent;
  let fixture: ComponentFixture<CapDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
