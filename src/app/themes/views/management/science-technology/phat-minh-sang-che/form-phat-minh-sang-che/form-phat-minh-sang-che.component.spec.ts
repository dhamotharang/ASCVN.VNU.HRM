/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormPhatMinhSangCheComponent } from './form-phat-minh-sang-che.component';

describe('FormPhatMinhSangCheComponent', () => {
  let component: FormPhatMinhSangCheComponent;
  let fixture: ComponentFixture<FormPhatMinhSangCheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPhatMinhSangCheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPhatMinhSangCheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
