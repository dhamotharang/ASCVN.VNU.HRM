/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TheoDoiTrangThaiComponent } from './theo-doi-trang-thai.component';

describe('TheoDoiTrangThaiComponent', () => {
  let component: TheoDoiTrangThaiComponent;
  let fixture: ComponentFixture<TheoDoiTrangThaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheoDoiTrangThaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoDoiTrangThaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
