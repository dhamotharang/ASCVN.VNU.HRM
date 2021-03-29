/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormGiaiThuongKhcnComponent } from './form-giai-thuong-khcn.component';

describe('FormGiaiThuongKhcnComponent', () => {
    let component: FormGiaiThuongKhcnComponent;
    let fixture: ComponentFixture<FormGiaiThuongKhcnComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormGiaiThuongKhcnComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormGiaiThuongKhcnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
