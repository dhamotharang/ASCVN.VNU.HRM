/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKiemNhiemComponent } from './form-kiem-nhiem.component';

describe('FormKiemNhiemComponent', () => {
    let component: FormKiemNhiemComponent;
    let fixture: ComponentFixture<FormKiemNhiemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormKiemNhiemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormKiemNhiemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
