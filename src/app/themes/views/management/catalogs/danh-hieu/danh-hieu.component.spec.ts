/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DanhHieuComponent } from './danh-hieu.component';

describe('DanhHieuComponent', () => {
    let component: DanhHieuComponent;
    let fixture: ComponentFixture<DanhHieuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DanhHieuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DanhHieuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
