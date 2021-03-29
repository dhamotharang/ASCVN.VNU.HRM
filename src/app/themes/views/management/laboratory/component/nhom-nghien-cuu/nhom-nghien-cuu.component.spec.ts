/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhomNghienCuuComponent } from './nhom-nghien-cuu.component';

describe('NhomNghienCuuComponent', () => {
  let component: NhomNghienCuuComponent;
  let fixture: ComponentFixture<NhomNghienCuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomNghienCuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomNghienCuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
