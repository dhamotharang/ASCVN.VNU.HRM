/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListDeTaiChuTriComponent } from './list-de-tai-chu-tri.component';

describe('ListDeTaiChuTriComponent', () => {
  let component: ListDeTaiChuTriComponent;
  let fixture: ComponentFixture<ListDeTaiChuTriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiChuTriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiChuTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
