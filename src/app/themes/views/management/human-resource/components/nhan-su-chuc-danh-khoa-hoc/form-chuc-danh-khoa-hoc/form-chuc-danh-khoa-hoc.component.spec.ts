/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChucDanhKhoaHocComponent } from './form-chuc-danh-khoa-hoc.component';

describe('FormChucDanhKhoaHocComponent', () => {
    let component: FormChucDanhKhoaHocComponent;
    let fixture: ComponentFixture<FormChucDanhKhoaHocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormChucDanhKhoaHocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormChucDanhKhoaHocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
