/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormSanPhamUngDungComponent } from './form-san-pham-ung-dung.component';

describe('FormSanPhamUngDungComponent', () => {
    let component: FormSanPhamUngDungComponent;
    let fixture: ComponentFixture<FormSanPhamUngDungComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormSanPhamUngDungComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormSanPhamUngDungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
