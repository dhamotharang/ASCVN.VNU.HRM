/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNhanSuDaoTaoBoiDuongComponent } from './form-nhan-su-dao-tao-boi-duong.component';

describe('FormNhanSuDaoTaoBoiDuongComponent', () => {
    let component: FormNhanSuDaoTaoBoiDuongComponent;
    let fixture: ComponentFixture<FormNhanSuDaoTaoBoiDuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNhanSuDaoTaoBoiDuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNhanSuDaoTaoBoiDuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
