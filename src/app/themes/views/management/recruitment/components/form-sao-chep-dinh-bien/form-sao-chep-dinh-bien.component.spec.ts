/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormSaoChepDinhBienComponent } from './form-sao-chep-dinh-bien.component';

describe('FormSaoChepDinhBienComponent', () => {
  let component: FormSaoChepDinhBienComponent;
  let fixture: ComponentFixture<FormSaoChepDinhBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSaoChepDinhBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSaoChepDinhBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
