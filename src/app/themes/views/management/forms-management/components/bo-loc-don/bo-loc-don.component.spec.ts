/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoLocDonComponent } from './bo-loc-don.component';

describe('BoLocDonComponent', () => {
  let component: BoLocDonComponent;
  let fixture: ComponentFixture<BoLocDonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoLocDonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoLocDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
