/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormQdPhanCongHdTapSuComponent } from './form-qd-phan-cong-hd-tap-su.component';

describe('FormQdPhanCongHdTapSuComponent', () => {
    let component: FormQdPhanCongHdTapSuComponent;
    let fixture: ComponentFixture<FormQdPhanCongHdTapSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormQdPhanCongHdTapSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormQdPhanCongHdTapSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
