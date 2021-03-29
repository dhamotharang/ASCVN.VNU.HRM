/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhomCongCuComponent } from './nhom-cong-cu.component';

describe('NhomCongCuComponent', () => {
  let component: NhomCongCuComponent;
  let fixture: ComponentFixture<NhomCongCuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomCongCuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomCongCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
