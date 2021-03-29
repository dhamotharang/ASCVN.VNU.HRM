/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DuAnDauTuComponent } from './du-an-dau-tu.component';

describe('DuAnDauTuComponent', () => {
  let component: DuAnDauTuComponent;
  let fixture: ComponentFixture<DuAnDauTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuAnDauTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuAnDauTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
