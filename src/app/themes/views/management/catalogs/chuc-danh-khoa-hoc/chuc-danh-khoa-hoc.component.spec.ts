/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChucDanhKhoaHocComponent } from './chuc-danh-khoa-hoc.component';

describe('ChucDanhKhoaHocComponent', () => {
    let component: ChucDanhKhoaHocComponent;
    let fixture: ComponentFixture<ChucDanhKhoaHocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChucDanhKhoaHocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChucDanhKhoaHocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
