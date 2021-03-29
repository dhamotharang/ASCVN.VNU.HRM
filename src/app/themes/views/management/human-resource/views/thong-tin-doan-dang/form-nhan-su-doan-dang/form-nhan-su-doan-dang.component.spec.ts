/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhanSuDoanDangComponent } from './form-nhan-su-doan-dang.component';

describe('FormNhanSuDoanDangComponent', () => {
    let component: FormNhanSuDoanDangComponent;
    let fixture: ComponentFixture<FormNhanSuDoanDangComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNhanSuDoanDangComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNhanSuDoanDangComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
