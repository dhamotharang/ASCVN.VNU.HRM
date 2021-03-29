/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKyLuatComponent } from './form-ky-luat.component';

describe('FormKyLuatComponent', () => {
    let component: FormKyLuatComponent;
    let fixture: ComponentFixture<FormKyLuatComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormKyLuatComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormKyLuatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
