/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKhoiCoQuanComponent } from './form-khoi-co-quan.component';

describe('FormKhoiCoQuanComponent', () => {
    let component: FormKhoiCoQuanComponent;
    let fixture: ComponentFixture<FormKhoiCoQuanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormKhoiCoQuanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormKhoiCoQuanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
