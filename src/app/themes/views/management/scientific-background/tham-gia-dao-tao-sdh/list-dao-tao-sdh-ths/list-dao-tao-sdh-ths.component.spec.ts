/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListDaoTaoSdhThsComponent } from './list-dao-tao-sdh-ths.component';

describe('ListDaoTaoSdhThsComponent', () => {
  let component: ListDaoTaoSdhThsComponent;
  let fixture: ComponentFixture<ListDaoTaoSdhThsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDaoTaoSdhThsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDaoTaoSdhThsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
