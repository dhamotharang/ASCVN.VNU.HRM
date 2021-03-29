/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListNhomCongCuComponent } from './list-nhom-cong-cu.component';

describe('ListNhomCongCuComponent', () => {
  let component: ListNhomCongCuComponent;
  let fixture: ComponentFixture<ListNhomCongCuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNhomCongCuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNhomCongCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
