/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThongTinTuyenDungComponent } from './form-thong-tin-tuyen-dung.component';

describe('FormThongTinTuyenDungComponent', () => {
    let component: FormThongTinTuyenDungComponent;
    let fixture: ComponentFixture<FormThongTinTuyenDungComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormThongTinTuyenDungComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormThongTinTuyenDungComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
