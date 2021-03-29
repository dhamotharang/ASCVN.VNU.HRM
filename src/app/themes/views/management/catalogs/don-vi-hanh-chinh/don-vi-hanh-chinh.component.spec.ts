/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DonViHanhChinhComponent } from './don-vi-hanh-chinh.component';

describe('DonViHanhChinhComponent', () => {
    let component: DonViHanhChinhComponent;
    let fixture: ComponentFixture<DonViHanhChinhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DonViHanhChinhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DonViHanhChinhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
