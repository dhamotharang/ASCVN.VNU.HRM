/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhatKyPhieuDanhGiaComponent } from './form-nhat-ky-phieu-danh-gia.component';

describe('FormNhatKyPhieuDanhGiaComponent', () => {
    let component: FormNhatKyPhieuDanhGiaComponent;
    let fixture: ComponentFixture<FormNhatKyPhieuDanhGiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNhatKyPhieuDanhGiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNhatKyPhieuDanhGiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
