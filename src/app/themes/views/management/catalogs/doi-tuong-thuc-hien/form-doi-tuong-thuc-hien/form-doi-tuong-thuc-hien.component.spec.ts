/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDoiTuongThucHienComponent } from './form-doi-tuong-thuc-hien.component';

describe('FormDoiTuongThucHienComponent', () => {
    let component: FormDoiTuongThucHienComponent;
    let fixture: ComponentFixture<FormDoiTuongThucHienComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDoiTuongThucHienComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDoiTuongThucHienComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
