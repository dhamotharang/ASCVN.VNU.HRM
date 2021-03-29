/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDeTaiKhcnComponent } from './form-de-tai-khcn.component';

describe('FormDeTaiKhcnComponent', () => {
    let component: FormDeTaiKhcnComponent;
    let fixture: ComponentFixture<FormDeTaiKhcnComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDeTaiKhcnComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDeTaiKhcnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
