/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormCoQuanComponent } from './form-co-quan.component';

describe('FormCoQuanComponent', () => {
    let component: FormCoQuanComponent;
    let fixture: ComponentFixture<FormCoQuanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormCoQuanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormCoQuanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
