/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNgoaiNguComponent } from './form-ngoai-ngu.component';

describe('FormNgoaiNguComponent', () => {
    let component: FormNgoaiNguComponent;
    let fixture: ComponentFixture<FormNgoaiNguComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormNgoaiNguComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormNgoaiNguComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
