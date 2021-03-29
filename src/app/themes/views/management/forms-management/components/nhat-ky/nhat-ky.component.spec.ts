/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhatKyComponent } from './nhat-ky.component';

describe('NhatKyComponent', () => {
  let component: NhatKyComponent;
  let fixture: ComponentFixture<NhatKyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhatKyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhatKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
