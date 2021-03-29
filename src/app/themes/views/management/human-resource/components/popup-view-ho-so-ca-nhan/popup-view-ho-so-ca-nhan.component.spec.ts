/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopupViewHoSoCaNhanComponent } from './popup-view-ho-so-ca-nhan.component';

describe('PopupViewHoSoCaNhanComponent', () => {
  let component: PopupViewHoSoCaNhanComponent;
  let fixture: ComponentFixture<PopupViewHoSoCaNhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupViewHoSoCaNhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupViewHoSoCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
