/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormVaiTroComponent } from './form-vai-tro.component';

describe('FormVaiTroComponent', () => {
  let component: FormVaiTroComponent;
  let fixture: ComponentFixture<FormVaiTroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVaiTroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVaiTroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
