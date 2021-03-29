/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuanLyHopDongComponent } from './quan-ly-hop-dong.component';

describe('QuanLyHopDongComponent', () => {
    let component: QuanLyHopDongComponent;
    let fixture: ComponentFixture<QuanLyHopDongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuanLyHopDongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuanLyHopDongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
