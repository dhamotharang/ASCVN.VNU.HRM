/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThongTinLuongComponent } from './form-thong-tin-luong.component';

describe('FormThongTinLuongComponent', () => {
    let component: FormThongTinLuongComponent;
    let fixture: ComponentFixture<FormThongTinLuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormThongTinLuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormThongTinLuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
