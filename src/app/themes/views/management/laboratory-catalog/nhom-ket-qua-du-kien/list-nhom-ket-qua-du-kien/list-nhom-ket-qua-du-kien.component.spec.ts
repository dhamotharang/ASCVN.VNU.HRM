/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListNhomKetQuaDuKienComponent } from './list-nhom-ket-qua-du-kien.component';

describe('ListNhomKetQuaDuKienComponent', () => {
  let component: ListNhomKetQuaDuKienComponent;
  let fixture: ComponentFixture<ListNhomKetQuaDuKienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNhomKetQuaDuKienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNhomKetQuaDuKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
