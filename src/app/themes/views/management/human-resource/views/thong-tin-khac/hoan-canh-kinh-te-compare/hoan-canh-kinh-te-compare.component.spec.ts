/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoanCanhKinhTeCompareComponent } from './hoan-canh-kinh-te-compare.component';

describe('HoanCanhKinhTeCompareComponent', () => {
  let component: HoanCanhKinhTeCompareComponent;
  let fixture: ComponentFixture<HoanCanhKinhTeCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoanCanhKinhTeCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoanCanhKinhTeCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
