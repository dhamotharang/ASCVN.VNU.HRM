/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QdPhanCongHdTapSuComponent } from './qd-phan-cong-hd-tap-su.component';

describe('QdPhanCongHdTapSuComponent', () => {
    let component: QdPhanCongHdTapSuComponent;
    let fixture: ComponentFixture<QdPhanCongHdTapSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QdPhanCongHdTapSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QdPhanCongHdTapSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
