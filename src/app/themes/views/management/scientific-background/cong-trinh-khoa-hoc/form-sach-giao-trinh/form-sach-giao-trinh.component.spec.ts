/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormSachGiaoTrinhComponent } from './form-sach-giao-trinh.component';

describe('FormSachGiaoTrinhComponent', () => {
    let component: FormSachGiaoTrinhComponent;
    let fixture: ComponentFixture<FormSachGiaoTrinhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormSachGiaoTrinhComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormSachGiaoTrinhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
