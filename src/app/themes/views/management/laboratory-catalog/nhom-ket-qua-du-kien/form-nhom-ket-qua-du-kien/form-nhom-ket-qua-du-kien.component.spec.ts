/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhomKetQuaDuKienComponent } from './form-nhom-ket-qua-du-kien.component';

describe('FormNhomKetQuaDuKienComponent', () => {
  let component: FormNhomKetQuaDuKienComponent;
  let fixture: ComponentFixture<FormNhomKetQuaDuKienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNhomKetQuaDuKienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNhomKetQuaDuKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
