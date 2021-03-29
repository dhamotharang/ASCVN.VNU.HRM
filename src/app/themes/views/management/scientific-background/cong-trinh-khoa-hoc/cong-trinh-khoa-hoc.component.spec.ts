/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CongTrinhKhoaHocComponent } from './cong-trinh-khoa-hoc.component';

describe('CongTrinhKhoaHocComponent', () => {
    let component: CongTrinhKhoaHocComponent;
    let fixture: ComponentFixture<CongTrinhKhoaHocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CongTrinhKhoaHocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CongTrinhKhoaHocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
