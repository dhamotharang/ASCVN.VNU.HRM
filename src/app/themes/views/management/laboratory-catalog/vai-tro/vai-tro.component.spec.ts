/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VaiTroComponent } from './vai-tro.component';

describe('VaiTroComponent', () => {
  let component: VaiTroComponent;
  let fixture: ComponentFixture<VaiTroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaiTroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaiTroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
