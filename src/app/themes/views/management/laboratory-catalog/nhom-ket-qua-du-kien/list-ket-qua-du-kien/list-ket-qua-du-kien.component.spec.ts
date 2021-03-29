/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListKetQuaDuKienComponent } from './list-ket-qua-du-kien.component';

describe('ListKetQuaDuKienComponent', () => {
  let component: ListKetQuaDuKienComponent;
  let fixture: ComponentFixture<ListKetQuaDuKienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKetQuaDuKienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKetQuaDuKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
