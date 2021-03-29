/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChonPhieuDanhGiaComponent } from './form-chon-phieu-danh-gia.component';

describe('FormChonPhieuDanhGiaComponent', () => {
    let component: FormChonPhieuDanhGiaComponent;
    let fixture: ComponentFixture<FormChonPhieuDanhGiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormChonPhieuDanhGiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormChonPhieuDanhGiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
