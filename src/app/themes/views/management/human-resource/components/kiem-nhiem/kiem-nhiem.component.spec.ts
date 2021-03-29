/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KiemNhiemComponent } from './kiem-nhiem.component';

describe('KiemNhiemComponent', () => {
    let component: KiemNhiemComponent;
    let fixture: ComponentFixture<KiemNhiemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KiemNhiemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KiemNhiemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
