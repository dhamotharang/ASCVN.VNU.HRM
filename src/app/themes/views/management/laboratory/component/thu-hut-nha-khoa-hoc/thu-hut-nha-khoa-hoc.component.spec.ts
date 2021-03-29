/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThuHutNhaKhoaHocComponent } from './thu-hut-nha-khoa-hoc.component';

describe('ThuHutNhaKhoaHocComponent', () => {
  let component: ThuHutNhaKhoaHocComponent;
  let fixture: ComponentFixture<ThuHutNhaKhoaHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuHutNhaKhoaHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuHutNhaKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
