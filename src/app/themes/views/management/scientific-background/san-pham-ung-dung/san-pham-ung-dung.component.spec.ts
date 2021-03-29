/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SanPhamUngDungComponent } from './san-pham-ung-dung.component';

describe('SanPhamUngDungComponent', () => {
    let component: SanPhamUngDungComponent;
    let fixture: ComponentFixture<SanPhamUngDungComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SanPhamUngDungComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SanPhamUngDungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
