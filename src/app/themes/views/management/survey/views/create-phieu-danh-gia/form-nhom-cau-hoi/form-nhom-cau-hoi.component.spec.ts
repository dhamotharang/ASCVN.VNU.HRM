/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhomCauHoiComponent } from './form-nhom-cau-hoi.component';

describe('FormNhomCauHoiComponent', () => {
    let component: FormNhomCauHoiComponent;
    let fixture: ComponentFixture<FormNhomCauHoiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNhomCauHoiComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNhomCauHoiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
