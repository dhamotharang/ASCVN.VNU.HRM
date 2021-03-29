/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TapChiComponent } from './tap-chi.component';

describe('TapChiComponent', () => {
  let component: TapChiComponent;
  let fixture: ComponentFixture<TapChiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapChiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
