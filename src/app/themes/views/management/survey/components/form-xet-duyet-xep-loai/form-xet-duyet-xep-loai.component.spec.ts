/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormXetDuyetXepLoaiComponent } from './form-xet-duyet-xep-loai.component';

describe('FormXetDuyetXepLoaiComponent', () => {
    let component: FormXetDuyetXepLoaiComponent;
    let fixture: ComponentFixture<FormXetDuyetXepLoaiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormXetDuyetXepLoaiComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormXetDuyetXepLoaiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
