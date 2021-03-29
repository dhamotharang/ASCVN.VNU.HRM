/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormKhenThuongComponent } from './form-khen-thuong.component';

describe('FormKhenThuongComponent', () => {
    let component: FormKhenThuongComponent;
    let fixture: ComponentFixture<FormKhenThuongComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormKhenThuongComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormKhenThuongComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
