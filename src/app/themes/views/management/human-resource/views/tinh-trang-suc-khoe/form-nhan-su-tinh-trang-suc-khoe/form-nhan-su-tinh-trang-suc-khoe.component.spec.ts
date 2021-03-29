/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhanSuTinhTrangSucKhoeComponent } from './form-nhan-su-tinh-trang-suc-khoe.component';

describe('FormNhanSuTinhTrangSucKhoeComponent', () => {
    let component: FormNhanSuTinhTrangSucKhoeComponent;
    let fixture: ComponentFixture<FormNhanSuTinhTrangSucKhoeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNhanSuTinhTrangSucKhoeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNhanSuTinhTrangSucKhoeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
