/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DuyetKhtdBanQuanLyComponent } from './duyet-khtd-ban-quan-ly.component';

describe('DuyetKhtdBanQuanLyComponent', () => {
    let component: DuyetKhtdBanQuanLyComponent;
    let fixture: ComponentFixture<DuyetKhtdBanQuanLyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DuyetKhtdBanQuanLyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DuyetKhtdBanQuanLyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
