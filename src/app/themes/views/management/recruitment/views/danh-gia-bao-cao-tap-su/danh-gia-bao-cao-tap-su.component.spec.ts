/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DanhGiaBaoCaoTapSuComponent } from './danh-gia-bao-cao-tap-su.component';

describe('DanhGiaBaoCaoTapSuComponent', () => {
    let component: DanhGiaBaoCaoTapSuComponent;
    let fixture: ComponentFixture<DanhGiaBaoCaoTapSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DanhGiaBaoCaoTapSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DanhGiaBaoCaoTapSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
