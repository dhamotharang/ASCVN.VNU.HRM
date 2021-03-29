/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormHopDongKhaiThacComponent } from './form-hop-dong-khai-thac.component';

describe('FormHopDongKhaiThacComponent', () => {
  let component: FormHopDongKhaiThacComponent;
  let fixture: ComponentFixture<FormHopDongKhaiThacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHopDongKhaiThacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHopDongKhaiThacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
