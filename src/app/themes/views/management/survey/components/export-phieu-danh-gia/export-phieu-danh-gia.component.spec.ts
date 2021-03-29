/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExportPhieuDanhGiaComponent } from './export-phieu-danh-gia.component';

describe('ExportPhieuDanhGiaComponent', () => {
    let component: ExportPhieuDanhGiaComponent;
    let fixture: ComponentFixture<ExportPhieuDanhGiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExportPhieuDanhGiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExportPhieuDanhGiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
