/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDotDanhGiaComponent } from './form-dot-danh-gia.component';

describe('FormDotDanhGiaComponent', () => {
    let component: FormDotDanhGiaComponent;
    let fixture: ComponentFixture<FormDotDanhGiaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDotDanhGiaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDotDanhGiaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
