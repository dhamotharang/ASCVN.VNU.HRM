/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDanhHieuComponent } from './form-danh-hieu.component';

describe('FormDanhHieuComponent', () => {
    let component: FormDanhHieuComponent;
    let fixture: ComponentFixture<FormDanhHieuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDanhHieuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDanhHieuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
