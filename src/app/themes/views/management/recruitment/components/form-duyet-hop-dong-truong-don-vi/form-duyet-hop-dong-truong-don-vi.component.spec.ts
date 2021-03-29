/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDuyetHopDongTruongDonViComponent } from './form-duyet-hop-dong-truong-don-vi.component';

describe('FormDuyetHopDongTruongDonViComponent', () => {
  let component: FormDuyetHopDongTruongDonViComponent;
  let fixture: ComponentFixture<FormDuyetHopDongTruongDonViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDuyetHopDongTruongDonViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDuyetHopDongTruongDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
