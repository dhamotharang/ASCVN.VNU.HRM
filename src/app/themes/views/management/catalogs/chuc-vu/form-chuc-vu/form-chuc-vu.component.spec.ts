/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChucVuComponent } from './form-chuc-vu.component';

describe('FormChucVuComponent', () => {
    let component: FormChucVuComponent;
    let fixture: ComponentFixture<FormChucVuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormChucVuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormChucVuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
