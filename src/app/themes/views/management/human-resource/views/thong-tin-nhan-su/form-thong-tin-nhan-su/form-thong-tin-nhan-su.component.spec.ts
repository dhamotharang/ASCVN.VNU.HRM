/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormThongTinNhanSuComponent } from './form-thong-tin-nhan-su.component';

describe('FormThongTinNhanSuComponent', () => {
    let component: FormThongTinNhanSuComponent;
    let fixture: ComponentFixture<FormThongTinNhanSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormThongTinNhanSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormThongTinNhanSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
