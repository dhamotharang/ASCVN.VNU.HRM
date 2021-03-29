/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTinhThanhComponent } from './form-tinh-thanh.component';

describe('FormTinhThanhComponent', () => {
    let component: FormTinhThanhComponent;
    let fixture: ComponentFixture<FormTinhThanhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTinhThanhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTinhThanhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
