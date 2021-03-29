/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeTaiKhcnComponent } from './de-tai-khcn.component';

describe('DeTaiKhcnComponent', () => {
    let component: DeTaiKhcnComponent;
    let fixture: ComponentFixture<DeTaiKhcnComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeTaiKhcnComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeTaiKhcnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
