/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListPhieuDanhGiaComponent } from './list-phieu-danh-gia.component';

describe('ListPhieuDanhGiaComponent', () => {
    let component: ListPhieuDanhGiaComponent;
    let fixture: ComponentFixture<ListPhieuDanhGiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListPhieuDanhGiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListPhieuDanhGiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
