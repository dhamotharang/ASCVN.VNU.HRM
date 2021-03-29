/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TienDoThucHienComponent } from './tien-do-thuc-hien.component';

describe('TienDoThucHienComponent', () => {
  let component: TienDoThucHienComponent;
  let fixture: ComponentFixture<TienDoThucHienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TienDoThucHienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TienDoThucHienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
