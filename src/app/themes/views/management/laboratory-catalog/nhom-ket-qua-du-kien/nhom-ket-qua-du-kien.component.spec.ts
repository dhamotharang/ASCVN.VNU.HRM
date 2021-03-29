/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhomKetQuaDuKienComponent } from './nhom-ket-qua-du-kien.component';

describe('NhomKetQuaDuKienComponent', () => {
  let component: NhomKetQuaDuKienComponent;
  let fixture: ComponentFixture<NhomKetQuaDuKienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomKetQuaDuKienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomKetQuaDuKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
