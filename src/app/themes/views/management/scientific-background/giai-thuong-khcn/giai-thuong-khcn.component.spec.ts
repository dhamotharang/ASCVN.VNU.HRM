/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiaiThuongKhcnComponent } from './giai-thuong-khcn.component';

describe('GiaiThuongKhcnComponent', () => {
    let component: GiaiThuongKhcnComponent;
    let fixture: ComponentFixture<GiaiThuongKhcnComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GiaiThuongKhcnComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GiaiThuongKhcnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
