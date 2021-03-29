/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDanhGiaBaoCaoTapSuComponent } from './form-danh-gia-bao-cao-tap-su.component';

describe('FormDanhGiaBaoCaoTapSuComponent', () => {
    let component: FormDanhGiaBaoCaoTapSuComponent;
    let fixture: ComponentFixture<FormDanhGiaBaoCaoTapSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDanhGiaBaoCaoTapSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDanhGiaBaoCaoTapSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
