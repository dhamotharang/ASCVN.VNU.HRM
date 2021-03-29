/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListPhieuTuDanhGiaComponent } from './list-phieu-tu-danh-gia.component';

describe('ListPhieuTuDanhGiaComponent', () => {
    let component: ListPhieuTuDanhGiaComponent;
    let fixture: ComponentFixture<ListPhieuTuDanhGiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListPhieuTuDanhGiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListPhieuTuDanhGiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
