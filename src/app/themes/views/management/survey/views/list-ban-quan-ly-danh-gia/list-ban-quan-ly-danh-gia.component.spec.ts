/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListBanQuanLyDanhGiaComponent } from './list-ban-quan-ly-danh-gia.component';

describe('ListBanQuanLyDanhGiaComponent', () => {
    let component: ListBanQuanLyDanhGiaComponent;
    let fixture: ComponentFixture<ListBanQuanLyDanhGiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListBanQuanLyDanhGiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListBanQuanLyDanhGiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
