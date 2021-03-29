/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTonGiaoComponent } from './form-ton-giao.component';

describe('FormTonGiaoComponent', () => {
    let component: FormTonGiaoComponent;
    let fixture: ComponentFixture<FormTonGiaoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTonGiaoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTonGiaoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
