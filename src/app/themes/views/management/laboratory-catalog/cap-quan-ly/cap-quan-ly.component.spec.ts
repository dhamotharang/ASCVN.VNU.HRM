/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CapQuanLyComponent } from './cap-quan-ly.component';

describe('CapQuanLyComponent', () => {
  let component: CapQuanLyComponent;
  let fixture: ComponentFixture<CapQuanLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapQuanLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapQuanLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
