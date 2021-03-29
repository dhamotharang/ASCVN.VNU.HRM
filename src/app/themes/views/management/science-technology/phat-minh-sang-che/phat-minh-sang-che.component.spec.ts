/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhatMinhSangCheComponent } from './phat-minh-sang-che.component';

describe('PhatMinhSangCheComponent', () => {
  let component: PhatMinhSangCheComponent;
  let fixture: ComponentFixture<PhatMinhSangCheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhatMinhSangCheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhatMinhSangCheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
