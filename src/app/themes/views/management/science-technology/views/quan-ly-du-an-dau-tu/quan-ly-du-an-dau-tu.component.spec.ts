/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyDuAnDauTuComponent } from './quan-ly-du-an-dau-tu.component';

describe('QuanLyDuAnDauTuComponent', () => {
  let component: QuanLyDuAnDauTuComponent;
  let fixture: ComponentFixture<QuanLyDuAnDauTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyDuAnDauTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyDuAnDauTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
