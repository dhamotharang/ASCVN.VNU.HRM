/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChonNhanSuComponent } from './form-chon-nhan-su.component';

describe('FormChonNhanSuComponent', () => {
    let component: FormChonNhanSuComponent;
    let fixture: ComponentFixture<FormChonNhanSuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormChonNhanSuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormChonNhanSuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
