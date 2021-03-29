/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormCongTrinhKhoaHocComponent } from './form-cong-trinh-khoa-hoc.component';

describe('FormCongTrinhKhoaHocComponent', () => {
    let component: FormCongTrinhKhoaHocComponent;
    let fixture: ComponentFixture<FormCongTrinhKhoaHocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormCongTrinhKhoaHocComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormCongTrinhKhoaHocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
