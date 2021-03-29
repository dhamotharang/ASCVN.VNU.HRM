/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KetQuaDuKienComponent } from './ket-qua-du-kien.component';

describe('KetQuaDuKienComponent', () => {
  let component: KetQuaDuKienComponent;
  let fixture: ComponentFixture<KetQuaDuKienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetQuaDuKienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetQuaDuKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
