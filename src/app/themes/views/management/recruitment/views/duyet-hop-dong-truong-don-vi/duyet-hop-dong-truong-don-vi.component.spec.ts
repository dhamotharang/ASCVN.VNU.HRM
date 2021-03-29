/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DuyetHopDongTruongDonViComponent } from './duyet-hop-dong-truong-don-vi.component';

describe('DuyetHopDongTruongDonViComponent', () => {
  let component: DuyetHopDongTruongDonViComponent;
  let fixture: ComponentFixture<DuyetHopDongTruongDonViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuyetHopDongTruongDonViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuyetHopDongTruongDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
