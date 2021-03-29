/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTinhTrangHonNhanComponent } from './form-tinh-trang-hon-nhan.component';

describe('FormTinhTrangHonNhanComponent', () => {
    let component: FormTinhTrangHonNhanComponent;
    let fixture: ComponentFixture<FormTinhTrangHonNhanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTinhTrangHonNhanComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTinhTrangHonNhanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
