/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KhenThuongKyLuatComponent } from './khen-thuong-ky-luat.component';

describe('KhenThuongKyLuatComponent', () => {
    let component: KhenThuongKyLuatComponent;
    let fixture: ComponentFixture<KhenThuongKyLuatComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KhenThuongKyLuatComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KhenThuongKyLuatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
