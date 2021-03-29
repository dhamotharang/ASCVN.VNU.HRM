/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyPhatMinhSangCheComponent } from './quan-ly-phat-minh-sang-che.component';

describe('QuanLyPhatMinhSangCheComponent', () => {
  let component: QuanLyPhatMinhSangCheComponent;
  let fixture: ComponentFixture<QuanLyPhatMinhSangCheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyPhatMinhSangCheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyPhatMinhSangCheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
