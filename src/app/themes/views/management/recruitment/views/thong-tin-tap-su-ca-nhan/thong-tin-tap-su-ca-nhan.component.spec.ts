/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThongTinTapSuCaNhanComponent } from './thong-tin-tap-su-ca-nhan.component';

describe('ThongTinTapSuCaNhanComponent', () => {
  let component: ThongTinTapSuCaNhanComponent;
  let fixture: ComponentFixture<ThongTinTapSuCaNhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinTapSuCaNhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinTapSuCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
