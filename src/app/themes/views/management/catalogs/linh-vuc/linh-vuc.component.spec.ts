/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LinhVucComponent } from './linh-vuc.component';

describe('LinhVucComponent', () => {
  let component: LinhVucComponent;
  let fixture: ComponentFixture<LinhVucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhVucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhVucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
