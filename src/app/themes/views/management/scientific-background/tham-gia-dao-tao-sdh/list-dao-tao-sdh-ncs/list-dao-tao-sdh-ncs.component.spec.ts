/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListDaoTaoSdhNcsComponent } from './list-dao-tao-sdh-ncs.component';

describe('ListDaoTaoSdhNcsComponent', () => {
  let component: ListDaoTaoSdhNcsComponent;
  let fixture: ComponentFixture<ListDaoTaoSdhNcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDaoTaoSdhNcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDaoTaoSdhNcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
